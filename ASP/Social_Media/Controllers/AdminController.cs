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


    }
}
