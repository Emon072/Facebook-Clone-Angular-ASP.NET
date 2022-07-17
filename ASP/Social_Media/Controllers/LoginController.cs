using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Social_Media.Data;
using Social_Media.Models;

namespace Social_Media.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private readonly InitialDbContext loginDbContext;

        public LoginController(InitialDbContext loginDbContext)
        {
            this.loginDbContext = loginDbContext;
        }

        // get all cards
        [HttpGet]
        public async Task<IActionResult> GetAllCards()
        {
            var loginInfo = await loginDbContext.loginClass.ToListAsync();
            return Ok(loginInfo);
        }

        // get single loginProfile
        [HttpGet]
        [Route("{id:guid}")]
        [ActionName("GetLogin")]
        public async Task<IActionResult> GetLogin([FromRoute] Guid id)
        {
            var loginInfo = await loginDbContext.loginClass.FirstOrDefaultAsync(x => x.Id == id);
            if (loginInfo != null)
            {
                return Ok(loginInfo);
            }
            else
            {
                return NotFound("Profile is not found");
            }
        }

        // Add card
        [HttpPost]
        public async Task<IActionResult> AddLogin([FromBody] LoginClass login)
        {
            login.Id = Guid.NewGuid();
            await loginDbContext.loginClass.AddAsync(login);
            await loginDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(AddLogin), new { id = login.Id }, login);
        }

        //update A profile
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateCard([FromRoute] Guid id, [FromBody] LoginClass login)
        {
            var existingCard = await loginDbContext.loginClass.FirstOrDefaultAsync(x => x.Id == id);
            if (existingCard != null)
            {
                existingCard.EmailAddress = login.EmailAddress;
                existingCard.Password = login.Password ;
                existingCard.Name = login.Name;
                await loginDbContext.SaveChangesAsync();
                return Ok(existingCard);
            }
            else
            {
                return NotFound("Account not found");
            }
        }

        // Delete A profile
        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteCard([FromRoute] Guid id)
        {
            var existingCard = await loginDbContext.loginClass.FirstOrDefaultAsync(x => x.Id == id);
            if (existingCard != null)
            {
                loginDbContext.loginClass.Remove(existingCard);
                await loginDbContext.SaveChangesAsync();
                return Ok(existingCard);
            }
            else
            {
                return NotFound("Card not found");
            }
        }
    }
}
