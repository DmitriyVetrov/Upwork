using Microsoft.AspNetCore.SignalR;
using System;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SignalRClientServer.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessageToUser(string userId, string message)
        {
            await Clients.User(userId).SendAsync("ReceiveMessage", currentUser, message, Context.ConnectionId);
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            Debug.WriteLine($"Connection {Context.ConnectionId} is disconnected");
            Clients.All.SendAsync("ReceiveMessage", "Debuger", $"Connection {Context.ConnectionId} is disconnected", "");
            return base.OnDisconnectedAsync(exception);
        }

        private string currentUser => (Context.User.Identity as ClaimsIdentity).Claims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;

    }
}