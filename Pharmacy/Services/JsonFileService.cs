using System.Text.Json;

namespace PharmacyApi.Services
{
    public class JsonFileService<T>
    {
        private readonly string _filePath;


        public JsonFileService(string fileName)
        {
            _filePath = Path.Combine(AppContext.BaseDirectory, fileName);
            if (!File.Exists(_filePath))
                File.WriteAllText(_filePath, "[]");
        }


        public List<T> Read()
        {
            var json = File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<List<T>>(json) ?? new();
        }


        public void Write(List<T> data)
        {
            var json = JsonSerializer.Serialize(data, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_filePath, json);
        }
    }
}
