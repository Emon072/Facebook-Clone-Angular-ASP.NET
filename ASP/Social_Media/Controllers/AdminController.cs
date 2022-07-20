using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Social_Media.Data;
using Social_Media.Models;

namespace Social_Media.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : Controller
    {
        private readonly InitialDbContext initialDbContext;

        public AdminController(InitialDbContext initialDbContext)
        {
            this.initialDbContext = initialDbContext;
        }

        // get all the admins
        [HttpGet]
        public async Task<IActionResult> GetAllAdmin()
        {
            var adminInfo = await initialDbContext.AdminClass.ToListAsync();
            return Ok(adminInfo);
        }

        // get single Admin
        [HttpGet]
        [Route("{AdminId:guid}")]
        [ActionName("GetAdmin")]
        public async Task<IActionResult> GetAdmin([FromRoute] Guid AdminId)
        {
            var AdminInfo = await initialDbContext.AdminClass.FirstOrDefaultAsync(x => x.AdminId == AdminId);
            if (AdminInfo != null)
            {
                return Ok(AdminInfo);
            }
            else
            {
                return NotFound("Admin is not found");
            }
        }

        // Add admin
        [HttpPost]
        public async Task<IActionResult> AddAdmin([FromBody] AdminClass admin)
        {
            await initialDbContext.AdminClass.AddAsync(admin);
            await initialDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(AddAdmin), new { AdminId = admin.AdminId }, admin);
        }
        // Delete A profile
        [HttpDelete]
        [Route("{AdminId:guid}")]
        public async Task<IActionResult> DeleteFriend([FromRoute] Guid AdminId)
        {
            var existingFriend = await initialDbContext.AdminClass.FirstOrDefaultAsync(x => x.AdminId == AdminId);
            if (existingFriend != null)
            {
                initialDbContext.AdminClass.Remove(existingFriend);
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
