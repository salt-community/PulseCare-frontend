const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const URL = `${BASE_URL}/conversations`;

export async function getMessages(conversationId: string, token: () => Promise<string>) {
    const jwt = await token();

    const res = await fetch(`${URL}/${conversationId}/messages`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });

    if (!res.ok) throw new Error("Failed to fetch messages");
    return res.json();
}

export async function sendMessage(
    conversationId: string,
    input: {
        subject: string;
        content: string;
        fromPatient: boolean;
    }, token: () => Promise<string>
) {
    const jwt = await token();

    const res = await fetch(`${URL}/${conversationId}/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`
        },
        body: JSON.stringify(input)
    });

    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
}

export async function markAllAsRead(conversationId: string, token: () => Promise<string>) {
    const jwt = await token();

    const res = await fetch(`${URL}/${conversationId}/messages/read-all`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });

    if (!res.ok) throw new Error("Failed to mark all messages as read");
    return true;
}


