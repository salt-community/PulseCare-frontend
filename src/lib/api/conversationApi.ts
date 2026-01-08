const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const URL = `${BASE_URL}/conversations`;

export async function getConversations(token: () => Promise<string>) {
    const jwt = await token();

    const res = await fetch(`${URL}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });

    if (!res.ok) throw new Error("Failed to fetch conversations");
    return res.json();
}


export async function startConversation(input: {
    patientId: string | null;
    doctorId: string | null;
    subject: string;
    content: string;
    fromPatient: boolean;
}, token: () => Promise<string>
) {
    const jwt = await token();

    const res = await fetch(`${URL}/start`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`
        },
        body: JSON.stringify({
            ...input,
            patientId: input.patientId ?? null,
            doctorId: input.doctorId ?? null
        })
    });

    if (!res.ok) throw new Error("Failed to start conversation");
    return res.json();
}
