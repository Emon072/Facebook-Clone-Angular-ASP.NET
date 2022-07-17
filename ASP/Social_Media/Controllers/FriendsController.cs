using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Social_Media.Data;
using Social_Media.Models;

namespace Social_Media.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FriendsController : Controller
    {
        private readonly InitialDbContext initialDbContext;

        public FriendsController(InitialDbContext initialDbContext)
        {
            this.initialDbContext = initialDbContext;
        }

        // get all the friends
        [HttpGet]
        public async Task<IActionResult> GetAllFriend()
        {
            var friendInfo = await initialDbContext.FriendClass.ToListAsync();
            return Ok(friendInfo);
        }

        // get single Admin
        [HttpGet]
        [Route("{Id:guid}")]
        [ActionName("GetFriend")]
        public async Task<IActionResult> GetFriend([FromRoute] Guid Id)
        {
            var FriendInfo = await initialDbContext.FriendClass.FirstOrDefaultAsync(x => x.Id == Id);
            if (FriendInfo != null)
            {
                return Ok(FriendInfo);
            }
            else
            {
                return NotFound("Admin is not found");
            }
        }

        // Add friend
        [HttpPost]
        public async Task<IActionResult> AddFriend([FromBody] FriendsClass frined)
        {
            frined.Id = Guid.NewGuid();
            await initialDbContext.FriendClass.AddAsync(frined);
            await initialDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(AddFriend), new { Id = frined.Id }, frined);
        }

        // Delete A profile
        [HttpDelete]
        [Route("{Id:guid}")]
        public async Task<IActionResult> DeleteFriend([FromRoute] Guid Id)
        {
            var existingFriend = await initialDbContext.FriendClass.FirstOrDefaultAsync(x => x.Id == Id);
            if (existingFriend != null)
            {
                initialDbContext.FriendClass.Remove(existingFriend);
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
