using Newtonsoft.Json;
using System.Net;

namespace DadJokesClient.Models
{
    public class DadJoke
    {
        [JsonProperty("question")]
        public string Question { get; set; }

        [JsonProperty("punchline")]
        public string Punchline { get; set; }

    }
}
