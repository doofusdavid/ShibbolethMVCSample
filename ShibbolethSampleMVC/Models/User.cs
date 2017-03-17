using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShibbolethSampleMVC.Models
{
    /// <summary>
    /// Represents the bare minimum of a User.  You can use other information which Shibboleth provides instead of ename
    /// </summary>
    public class User
    {
        public int Id { get; set; }
        public string Ename { get; set; }
        public DateTime LastLogin { get; set; }

        public ICollection<Role> Roles { get; set; }
    }
}