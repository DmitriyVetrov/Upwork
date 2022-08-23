using Microsoft.AspNetCore.SignalR;
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

        private string currentUser => (Context.User.Identity as ClaimsIdentity).Claims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;

    }
}