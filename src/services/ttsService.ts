export class TTSService {
  private static isPlaying = false;
  private static currentTimer: ReturnType<typeof setTimeout> | null = null;

  static async play(
    text: string,
    onUpdate: (text: string) => void,
    onComplete: () => void,
  ) {
    this.stop();
    this.isPlaying = true;

    // Simulate TTS API call to /api/tts
    // In real implementation: await fetch('/api/tts', { method: 'POST', body: JSON.stringify({ text }) });

    // As per requirements: "点击讲解出来完整字幕就可以" (Clicking explain should show full subtitle)
    onUpdate(text);

    // Simulate audio duration based on text length (approx 200ms per character for reading)
    const duration = text.length * 200;

    this.currentTimer = setTimeout(() => {
      this.isPlaying = false;
      onComplete();
    }, duration);
  }

  static stop() {
    this.isPlaying = false;
    if (this.currentTimer) {
      clearTimeout(this.currentTimer);
      this.currentTimer = null;
    }
  }
}
