using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Social_Media.Data;
using Social_Media.Models;

namespace Social_Media.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class RequestController : Controller
    {
        private readonly InitialDbContext initialDbContext;

        public RequestController(InitialDbContext initialDbContext)
        {
            this.initialDbContext = initialDbContext;
        }

        // get all the Request
        [HttpGet]
        public async Task<IActionResult> GetAllRequest()
        {
            var friendInfo = await initialDbContext.RequestClass.ToListAsync();
            return Ok(friendInfo);
        }

        // get single Request
        [HttpGet]
        [Route("{id:guid}")]
        [ActionName("GetRequest")]
        public async Task<IActionResult> GetRequest([FromRoute] Guid id)
        {
            var FriendInfo = await initialDbContext.RequestClass.FirstOrDefaultAsync(x => x.id == id);
            if (FriendInfo != null)
            {
                return Ok(FriendInfo);
            }
            else
            {
                return NotFound("Request is not found");
            }
        }

        // Add request
        [HttpPost]
        public async Task<IActionResult> AddRequest([FromBody]  RequestClass request)
        {
            request.id = Guid.NewGuid();
            await initialDbContext.RequestClass.AddAsync(request);
            await initialDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(AddRequest), new { id = request.id }, request);
        }

        // Delete A request
        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteRequest([FromRoute] Guid id)
        {
            var existingFriend = await initialDbContext.RequestClass.FirstOrDefaultAsync(x => x.id == id);
            if (existingFriend != null)
            {
                initialDbContext.RequestClass.Remove(existingFriend);
                await initialDbContext.SaveChangesAsync();
                return Ok(existingFriend);
            }
            else
            {
                return NotFound("Friend not found");
            }
        }
    }
}
