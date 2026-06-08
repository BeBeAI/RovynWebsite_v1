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

        const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
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
            }),
        });

        if (!openRouterResponse.ok) {
            const errorText = await openRouterResponse.text();
            throw new Error(`OpenRouter API request failed: ${errorText}`);
        }

        const data = await openRouterResponse.json();
        const rawText = data?.choices?.[0]?.message?.content;

        if (!rawText) {
            throw new Error('OpenRouter API returned no report text');
        }

        const reportText = Array.isArray(rawText)
            ? rawText
                    .map((part) => (typeof part === 'string' ? part : part?.text || ''))
                    .join('')
            : rawText;

        const cleanedText = stripBackticks(reportText);

        try {
            const report = JSON.parse(cleanedText);
            try {
                await saveLeadToSupabase(env, payload, report);
            } catch (error) {
                console.error('Failed to save lead to Supabase:', error);
            }
            return jsonResponse(report);
        } catch (error) {
            throw new Error(
                `Failed to parse OpenRouter JSON response: ${error instanceof Error ? error.message : String(error)}`
            );
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