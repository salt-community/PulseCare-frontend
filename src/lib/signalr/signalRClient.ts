import * as signalR from "@microsoft/signalr";

const BASE_URL = import.meta.env.VITE_SIGNALR_BASE_URL;


let connection: signalR.HubConnection | null = null;
const messageBaseUrl = `${BASE_URL}`;

export function getSignalRConnection(tokenFactory: () => Promise<string>) {
    if (connection) return connection;

    connection = new signalR.HubConnectionBuilder()
        .withUrl(messageBaseUrl, {
            accessTokenFactory: tokenFactory
        })
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

    return connection;
}
