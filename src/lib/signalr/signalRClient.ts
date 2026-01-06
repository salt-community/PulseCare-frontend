import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;
const messageBaseUrl = "http://localhost:5002/pulsecarehub";

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
