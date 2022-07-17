using System.ComponentModel.DataAnnotations;

namespace Social_Media.Models
{
    public class MessagesClass
    {
        public int sorting_number { get; set; }
        [Key]
        public Guid MessageId { get; set; }
        public Guid MessageSenderId { get; set; }
        public Guid MessageReceiverId { get; set; }
        public string Message { get; set; }
    }
}
