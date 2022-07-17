using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Social_Media.Data;
using Social_Media.Models;

namespace Social_Media.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class StoryController : Controller
    {
        private readonly InitialDbContext initialDbContext;

        public StoryController(InitialDbContext initialDbContext)
        {
            this.initialDbContext = initialDbContext;
        }

        // get all story
        [HttpGet]
        public async Task<IActionResult> GetAllStory()
        {
            var storyInfo = await initialDbContext.StoryClass.ToListAsync();
            return Ok(storyInfo);
        }

        // get single story
        [HttpGet]
        [Route("{StoryId:guid}")]
        [ActionName("GetStory")]
        public async Task<IActionResult> GetStory([FromRoute] Guid StoryId)
        {
            var storyInfo = await initialDbContext.StoryClass.FirstOrDefaultAsync(x => x.StoryId == StoryId);
            if (storyInfo != null)
            {
                return Ok(storyInfo);
            }
            else
            {
                return NotFound("Story is not found");
            }
        }

        // Add story
        [HttpPost]
        public async Task<IActionResult> AddStory([FromBody] StoryClass story)
        {
            story.StoryId = Guid.NewGuid();
            await initialDbContext.StoryClass.AddAsync(story);
            await initialDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(AddStory), new { storyId = story.StoryId }, story);
        }

        // Delete A profile
        [HttpDelete]
        [Route("{StoryId:guid}")]
        public async Task<IActionResult> DeleteStory([FromRoute] Guid StoryId)
        {
            var existingStory = await initialDbContext.StoryClass.FirstOrDefaultAsync(x => x.StoryId == StoryId);
            if (existingStory != null)
            {
                initialDbContext.StoryClass.Remove(existingStory);
                await initialDbContext.SaveChangesAsync();
                return Ok(existingStory);
            }
            else
            {
                return NotFound("Story not found");
            }
        }
    }
}
