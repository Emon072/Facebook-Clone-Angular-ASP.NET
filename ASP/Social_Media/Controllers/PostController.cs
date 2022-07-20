using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Social_Media.Data;
using Social_Media.Models;

namespace Social_Media.Controllers
{

    [ApiController]
    [Route("api/[controller]")]    
    public class PostController : Controller
    {
        private readonly InitialDbContext initialDbContext;

        public PostController(InitialDbContext initialDbContext)
        {
            this.initialDbContext = initialDbContext;
        }

        // get all posts
        [HttpGet]
        public async Task<IActionResult> GetAllPosts()
        {
            var postInfo = await initialDbContext.PostClass.ToListAsync();
            return Ok(postInfo);
        }

        // get single post
        [HttpGet]
        [Route("{id:guid}")]
        [ActionName("GetPost")]
        public async Task<IActionResult> GetPost([FromRoute] Guid id)
        {
            var postInfo = await initialDbContext.PostClass.FirstOrDefaultAsync(x => x.Id == id);
            if (postInfo != null)
            {
                return Ok(postInfo);
            }
            else
            {
                return NotFound("Post not found");
            }
        }

        // Add post
        [HttpPost]
        public async Task<IActionResult> AddPost([FromBody] PostClass post)
        {
            post.Id = Guid.NewGuid();
            await initialDbContext.AddAsync(post);
            await initialDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(AddPost), new { id = post.Id }, post);
        }

        //update A Post
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdatePost([FromRoute] Guid id, [FromBody]  PostClass post)
        {
            var existingPost = await initialDbContext.PostClass.FirstOrDefaultAsync(x => x.Id == id);
            if (existingPost != null)
            {
                existingPost.Name = post.Name;
                existingPost.PostMessage = post.PostMessage;
                existingPost.PostPersionId = post.PostPersionId;
                existingPost.PostImage = post.PostImage;
                existingPost.Like = post.Like;
                existingPost.CreatedDate = post.CreatedDate;
                await initialDbContext.SaveChangesAsync();
                return Ok(existingPost);
            }
            else
            {
                return NotFound("Post not found");
            }
        }

        // Delete A Post
        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeletePost([FromRoute] Guid id)
        {
            var existingPost = await initialDbContext.PostClass.FirstOrDefaultAsync(x => x.Id == id);
            if (existingPost != null)
            {
                initialDbContext.PostClass.Remove(existingPost);
                await initialDbContext.SaveChangesAsync();
                return Ok(existingPost);
            }
            else
            {
                return NotFound("Post not found");
            }
        }
    }
}
