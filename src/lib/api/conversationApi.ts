const BASE_URL = "/api/conversations";

export async function getConversations(role: "patient" | "doctor", userId: string, token: () => Promise<string>) {
    const jwt = await token();

    const res = await fetch(`${BASE_URL}?role=${role}&userId=${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
    if (!res.ok) throw new Error("Failed to fetch conversations");
    return res.json();
}


export async function startConversation(input: {
    patientId: string;
    doctorId: string;
    subject: string;
    content: string;
    fromPatient: boolean;
}, token: () => Promise<string>
) {
    const jwt = await token();

    const res = await fetch(`${BASE_URL}/start`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`
        },
        body: JSON.stringify(input)
    });

    if (!res.ok) throw new Error("Failed to start conversation");
    return res.json();
}
