function CleanVoiceApp() {
  const [file, setFile] = React.useState(null);
  const [processing, setProcessing] = React.useState(false);
  const [resultUrl, setResultUrl] = React.useState('');

  const handleFileChange = (e) => {
    const uploaded = e.target.files[0];
    setFile(uploaded);
    setResultUrl('');
  };

  const handleProcess = () => {
    if (!file) {
      alert('Сначала выберите файл!');
      return;
    }
    setProcessing(true);
    // Имитация “очистки” аудио — просто таймер, чтобы показать процесс
    setTimeout(() => {
      setProcessing(false);
      // Демонстрационный результат — просто возвращаем тот же файл (для настоящей обработки тут будет backend)
      const url = URL.createObjectURL(file);
      setResultUrl(url);
    }, 2000);
  };

  return (
    <div style={{padding: 24, maxWidth: 420, margin: '0 auto'}}>
      <h1>CleanVoice</h1>
      <p>Загрузите аудиофайл для очистки от шумов:</p>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <br/><br/>
      <button onClick={handleProcess} disabled={!file || processing}>
        {processing ? "Обработка..." : "Очистить"}
      </button>
      <br/><br/>
      {resultUrl && (
        <div>
          <h4>Готово! Скачайте очищенный файл:</h4>
          <audio controls src={resultUrl}></audio>
          <br/>
          <a href={resultUrl} download="cleaned-audio.mp3">Скачать</a>
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CleanVoiceApp />);
