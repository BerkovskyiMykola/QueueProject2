namespace QueueProject.Models
{
    public class Status
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = "";

        public List<QueuePerson> QueuePeople { get; set; } = new List<QueuePerson>();
    }
}
