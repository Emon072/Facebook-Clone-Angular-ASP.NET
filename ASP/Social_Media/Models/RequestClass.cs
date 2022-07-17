using System.ComponentModel.DataAnnotations;

namespace Social_Media.Models
{
    public class RequestClass
    {
        [Key]
        public Guid id { get; set; }
        public Guid RequestPersonId { get; set; }
        public Guid RequestSenderId { get; set; }
    }
}
