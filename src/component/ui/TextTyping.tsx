import { useState, useEffect } from "react";

/**
 * Komponen TextType
 * @param {Array} words - Daftar kata/kalimat yang akan ditampilkan secara bergantian.
 * @param {number} typingSpeed - Kecepatan mengetik (ms).
 * @param {number} deletingSpeed - Kecepatan menghapus (ms).
 * @param {number} pauseTime - Waktu jeda saat teks selesai diketik (ms).
 */
const TextType = ({
  words = [""],
  typingSpeed = 150,
  deletingSpeed = 75,
  pauseTime = 2000,
}) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [delta, setDelta] = useState(typingSpeed);

  useEffect(() => {
    const handleTyping = () => {
      // Ambil teks saat ini dari array berdasarkan index loop
      const currentIndex = loopIndex % words.length;
      const fullText = words[currentIndex];

      // Tentukan teks baru (tambah atau kurangi 1 karakter)
      const updatedText = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);

      setText(updatedText);

      // Logika Transisi
      if (!isDeleting && updatedText === fullText) {
        // Jika selesai mengetik, tunggu selama pauseTime lalu mulai menghapus
        setIsDeleting(true);
        setDelta(pauseTime);
      } else if (isDeleting && updatedText === "") {
        // Jika selesai menghapus, pindah ke kata berikutnya
        setIsDeleting(false);
        setLoopIndex(loopIndex + 1);
        setDelta(typingSpeed);
      } else if (isDeleting) {
        // Gunakan kecepatan menghapus yang lebih cepat
        setDelta(deletingSpeed);
      } else {
        // Gunakan kecepatan mengetik normal
        setDelta(typingSpeed);
      }
    };

    const timer = setTimeout(() => {
      handleTyping();
    }, delta);

    return () => clearTimeout(timer);
  }, [
    text,
    isDeleting,
    loopIndex,
    words,
    delta,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  return (
    <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 transition-all duration-1000 ease-out">
      <span>{text}</span>
      <span className="ml-1 border-r-4 border-blue-600 dark:border-violet-600 animate-pulse">
        &nbsp;
      </span>
    </h1>
  );
};

export default TextType;
