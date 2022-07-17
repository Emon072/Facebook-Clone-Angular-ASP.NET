using System.ComponentModel.DataAnnotations;

namespace Social_Media.Models
{
    public class CommentClass
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ProfileImage { get; set; }
        public string CommentData { get; set; }

        public string PostId { get; set; }
    }
}
