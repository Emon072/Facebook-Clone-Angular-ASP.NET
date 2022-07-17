using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Social_Media.Data;
using Social_Media.Models;

namespace Social_Media.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class MessageController : Controller
    {
        private readonly InitialDbContext initialDbContext;

        public MessageController(InitialDbContext initialDbContext)
        {
            this.initialDbContext = initialDbContext;
        }

        // get all message
        [HttpGet]
        public async Task<IActionResult> GetAllMessage()
        {
            var MessageInfo = await initialDbContext.MessagesClass.ToListAsync();
            return Ok(MessageInfo);
        }

        // get single Message
        [HttpGet]
        [Route("{MessageId:guid}")]
        [ActionName("GetMessage")]
        public async Task<IActionResult> GetMessage([FromRoute] Guid MessageId)
        {
            var MessageInfo = await initialDbContext.MessagesClass.FirstOrDefaultAsync(x => x.MessageId == MessageId);
            if (MessageInfo != null)
            {
                return Ok(MessageInfo);
            }
            else
            {
                return NotFound("Message is not found");
            }
        }

        // Add message
        [HttpPost]
        public async Task<IActionResult> AddMessage([FromBody] MessagesClass message)
        {
            message.MessageId = Guid.NewGuid();
            await initialDbContext.MessagesClass.AddAsync(message);
            await initialDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(AddMessage), new { MessageId = message.MessageId }, message);
        }

        // Delete A message
        [HttpDelete]
        [Route("{MessageId:guid}")]
        public async Task<IActionResult> DeleteMessage([FromRoute] Guid MessageId)
        {
            var existingMessage = await initialDbContext.MessagesClass.FirstOrDefaultAsync(x => x.MessageId == MessageId);
            if (existingMessage != null)
            {
                initialDbContext.MessagesClass.Remove(existingMessage);
                await initialDbContext.SaveChangesAsync();
                return Ok(existingMessage);
            }
            else
            {
                return NotFound("Message not found");
            }
        }

    }
}
