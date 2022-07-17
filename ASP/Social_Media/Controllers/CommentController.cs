using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Social_Media.Data;
using Social_Media.Models;

namespace Social_Media.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : Controller
    {
        private readonly InitialDbContext initialDbContext;

        public CommentController(InitialDbContext initialDbContext)
        {
            this.initialDbContext = initialDbContext;
        }

        // get all comments
        [HttpGet]
        public async Task<IActionResult> GetAllComments()
        {
            var commentInfo = await initialDbContext.CommentClass.ToListAsync();
            return Ok(commentInfo);
        }

        // get single comment
        [HttpGet]
        [Route("{id:guid}")]
        [ActionName("GetComment")]
        public async Task<IActionResult> GetComment([FromRoute] Guid id)
        {
            var commentInfo = await initialDbContext.CommentClass.FirstOrDefaultAsync(x => x.Id == id);
            if (commentInfo != null)
            {
                return Ok(commentInfo);
            }
            else
            {
                return NotFound("Comment not found");
            }
        }

        // Add comment
        [HttpPost]
        public async Task<IActionResult> AddComment([FromBody] CommentClass comment)
        {
            comment.Id = Guid.NewGuid();
            await initialDbContext.AddAsync(comment);
            await initialDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(AddComment), new { id = comment.Id }, comment);
        }

        //update A Comment
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateComment([FromRoute] Guid id, [FromBody] CommentClass comment)
        {
            var existingComment = await initialDbContext.CommentClass.FirstOrDefaultAsync(x => x.Id == id);
            if (existingComment != null)
            {
                existingComment.Name = comment.Name;
                existingComment.ProfileImage = comment.ProfileImage;
                existingComment.CommentData = comment.CommentData;
                existingComment.PostId = comment.PostId;
                await initialDbContext.SaveChangesAsync();
                return Ok(existingComment);
            }
            else
            {
                return NotFound("Comment not found");
            }
        }

        // Delete A Comment
        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteComment([FromRoute] Guid id)
        {
            var existingComment = await initialDbContext.CommentClass.FirstOrDefaultAsync(x => x.Id == id);
            if (existingComment != null)
            {
                initialDbContext.CommentClass.Remove(existingComment);
                await initialDbContext.SaveChangesAsync();
                return Ok(existingComment);
            }
            else
            {
                return NotFound("Comment not found");
            }
        }
    }
}
