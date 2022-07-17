using Microsoft.EntityFrameworkCore;

using Social_Media.Models;

namespace Social_Media.Data
{
    public class InitialDbContext : DbContext
    {
        public InitialDbContext(DbContextOptions options) : base(options)
        {
        }
        // Db set
        public DbSet<LoginClass> loginClass { get; set; }
        public DbSet<PostClass> PostClass { get; set; }
        public DbSet<CommentClass> CommentClass { get; set; }
        public DbSet<StoryClass> StoryClass { get; set; }
        public DbSet<AdminClass> AdminClass { get; set; }
        public DbSet<FriendsClass> FriendClass { get; set; }
        public DbSet<MessagesClass> MessagesClass { get; set; }
        public DbSet<RequestClass> RequestClass { get; set; }
    }
}
