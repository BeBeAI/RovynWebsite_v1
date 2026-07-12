    const JSON_HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    };

    const TEST_REPORT = {
    score: 'high',
    score_label: 'Strong AI fit',
    headline: 'You are losing 10 hours a week to work a bot could do',
    time_cost:
        'Based on your answers, your team is spending significant time on tasks that follow predictable patterns. That is exactly what AI handles best.',
    ai_opportunity:
        'For a business your size, automating your lead follow-up alone could recover 8 to 10 hours weekly.',
    first_step:
        'Map out exactly what happens between a new enquiry landing and your first response.',
    honest_note:
        'You are ready — the bottleneck is not your business, it is just that nobody has built the right system yet.',
    };

const OPENROUTER_DEFAULT_MODEL = 'openrouter/owl-alpha';

    const HEALTH_REPORT = {
    status: 'ok',
    service: 'rovyn-assessment-worker',
    message: 'Send a POST request with name, email, q1, q2, q3, q4, and q5 to generate an AI Fit Report.',
    };

    function jsonResponse(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: JSON_HEADERS,
    });
    }

    function isTruthy(value) {
    return ['true', '1', 'yes', 'on'].includes(String(value).trim().toLowerCase());
    }

    function stripBackticks(text) {
    return String(text).replace(/`/g, '').trim();
    }

    function buildPrompt({ name, email, q1, q2, q3, q4, q5 }) {
    return [
        'Write a short, honest, personalised AI Fit Report for a local business owner on behalf of Rovyn, an AI consulting agency.',
        'Be direct, specific and honest. Never use corporate fluff.',
        'Return pure JSON only with these keys: score, score_label, headline, time_cost, ai_opportunity, first_step, honest_note.',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Q1: ${q1}`,
        `Q2: ${q2}`,
        `Q3: ${q3}`,
        `Q4: ${q4}`,
        `Q5: ${q5}`,
    ].join('\n');
    }

    async function saveLeadToSupabase(env, payload, report) {
    const supabaseUrl = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
    const serviceKey = env.SUPABASE_SERVICE_KEY || env.VITE_SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !serviceKey) {
        throw new Error('Supabase URL or service key is not configured');
    }

    const response = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/leads`, {
        method: 'POST',
        headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
        },
        body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        q1: payload.q1,
        q2: payload.q2,
        q3: payload.q3,
        q4: payload.q4,
        q5: payload.q5,
        score: report.score,
        report,
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Supabase save failed: ${errorText}`);
    }
    }

    async function handleGenerateReport(env, payload) {
        if (isTruthy(env.TEST_MODE)) {
            return jsonResponse(TEST_REPORT);
        }

        const apiKey = env.OPENROUTER_API_KEY;
        if (!apiKey) {
            throw new Error('OPENROUTER_API_KEY is not configured');
        }

        const prompt = buildPrompt(payload);
        const model = env.OPENROUTER_MODEL || OPENROUTER_DEFAULT_MODEL;

        // Helper: simple sleep for backoff
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

        // Retry wrapper around OpenRouter request
        async function fetchOpenRouterWithRetries(bodyObj, headers = {}, maxAttempts = 3) {
            let attempt = 0;
            let lastErr;
            const bodyText = JSON.stringify(bodyObj);
            while (++attempt <= maxAttempts) {
                try {
                    const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                        method: 'POST',
                        headers: Object.assign({ Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }, headers),
                        body: bodyText,
                    });

                    const text = await resp.text();
                    if (!resp.ok) {
                        lastErr = new Error(`OpenRouter HTTP ${resp.status}: ${text.slice(0, 500)}`);
                        throw lastErr;
                    }

                    // Try parse JSON response from OpenRouter
                    let json;
                    try {
                        json = JSON.parse(text);
                    } catch (pErr) {
                        // Return both json=undefined and raw text for downstream parsing attempts
                        return { json: undefined, text };
                    }

                    return { json, text };
                } catch (err) {
                    lastErr = err;
                    if (attempt < maxAttempts) {
                        // exponential backoff
                        await sleep(200 * Math.pow(2, attempt - 1));
                        continue;
                    }
                    throw lastErr;
                }
            }
        }

        function extractJSON(text) {
            const original = String(text ?? '');
            // quick clean: remove triple backticks and common prefixes like "json " or "json:\n"
            let cleaned = original.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
            cleaned = cleaned.replace(/^[\s\n]*json[:\s]*/i, '').trim();
            // Try direct parse first
            try {
                return JSON.parse(cleaned);
            } catch (e) {}

            // Try to find the first {...} block
            const first = cleaned.indexOf('{');
            const last = cleaned.lastIndexOf('}');
            if (first !== -1 && last !== -1 && last > first) {
                const sub = cleaned.slice(first, last + 1);
                try {
                    return JSON.parse(sub);
                } catch (e) {}
            }

            // Regex fallback: match the first JSON object-looking substring
            const match = cleaned.match(/\{[\s\S]*\}/);
            if (match) {
                try {
                    return JSON.parse(match[0]);
                } catch (e) {}
            }

            // As last resort, try to strip backticks only and parse
            try {
                return JSON.parse(stripBackticks(original));
            } catch (e) {}

            throw new Error('Could not extract JSON from OpenRouter response');
        }

        // Build body for OpenRouter
        const requestBody = {
            model,
            messages: [
                {
                    role: 'system',
                    content:
                        'You are writing a short, honest, personalised AI Fit Report for a local business owner on behalf of Rovyn, an AI consulting agency. Be direct, specific and honest. Never use corporate fluff.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0.4,
        };

        const { json: orJson, text: orText } = await fetchOpenRouterWithRetries(requestBody, {}, 3);

        // Try to obtain the rawText from parsed JSON if available, otherwise attempt to extract from raw text
        let rawText = orJson?.choices?.[0]?.message?.content;
        if (!rawText) {
            // Try to parse the raw response text as JSON and re-check
            if (orText) {
                try {
                    const parsed = JSON.parse(orText);
                    rawText = parsed?.choices?.[0]?.message?.content;
                } catch (e) {
                    // ignore
                }
            }
        }

        if (!rawText && orText) {
            // As a last resort, try to extract any JSON object from the raw response text
            try {
                const maybe = extractJSON(orText);
                // If this looks like a report, use it
                if (maybe && maybe.score) {
                    try {
                        await saveLeadToSupabase(env, payload, maybe);
                    } catch (error) {
                        console.error('Failed to save lead to Supabase:', error);
                    }
                    return jsonResponse(maybe);
                }
            } catch (e) {
                // fallthrough to error below
            }
        }

        if (!rawText) {
            // include snippet for debugging
            const snippet = (orText || '').slice(0, 500);
            throw new Error(`OpenRouter API returned no report text. Response snippet: ${snippet}`);
        }

        const reportText = Array.isArray(rawText)
            ? rawText
                    .map((part) => (typeof part === 'string' ? part : part?.text || ''))
                    .join('')
            : rawText;

        const cleanedText = stripBackticks(reportText);

        try {
            const report = extractJSON(cleanedText);
            try {
                await saveLeadToSupabase(env, payload, report);
            } catch (error) {
                console.error('Failed to save lead to Supabase:', error);
            }
            return jsonResponse(report);
        } catch (error) {
            // include snippets to aid debugging
            const snippet = (reportText || '').slice(0, 500);
            const fullSnippet = (orText || '').slice(0, 1000);
            throw new Error(`Failed to parse OpenRouter JSON response: ${error instanceof Error ? error.message : String(error)}. Report snippet: ${snippet}. Full response snippet: ${fullSnippet}`);
        }
    }

    export default {
    async fetch(request, env) {
        try {
        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: JSON_HEADERS });
        }

            if (request.method === 'GET' || request.method === 'HEAD') {
                return jsonResponse(HEALTH_REPORT);
            }

        if (request.method !== 'POST') {
            return jsonResponse({ error: 'Method not allowed' }, 405);
        }

        const payload = await request.json();
        const { name, email, q1, q2, q3, q4, q5 } = payload ?? {};

        if (!name || !email || !q1 || !q2 || !q3 || !q4 || !q5) {
            return jsonResponse({ error: 'Missing required fields' }, 400);
        }

        return await handleGenerateReport(env, { name, email, q1, q2, q3, q4, q5 });
        } catch (error) {
        return jsonResponse({ error: error?.message || 'Unknown error' }, 500);
        }
    },
    };