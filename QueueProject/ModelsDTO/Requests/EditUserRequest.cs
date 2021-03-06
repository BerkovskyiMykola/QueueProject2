using System.ComponentModel.DataAnnotations;

namespace QueueProject.Models.Request
{
    public class EditUserRequest
    {
        public Guid UserId { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Lastname { set; get; } = "";
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Firstname { set; get; } = "";
        [Required]
        public Guid RoleId { set; get; }
    }
}
