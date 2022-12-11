using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace VideoServices.Models
{
    public class Token
    {
        [Key]
        public Guid TokenId { get; set; }
        public string TokenValue { get; set; }
        public Guid UserId { get; set; }
        public bool BlackListed { get; set; }
        public DateTime ExpiredDate { get; set; }

        public Token()
        {
            BlackListed = false;
        }
    }
}
