import mammoth from 'mammoth';
import { extractText } from 'unpdf';

export async function extractTextFromFile(buffer: Buffer, fileType: string): Promise<string> {
  if (fileType === 'application/pdf') {
    try {
      // unpdf exige Uint8Array
      const uint8Array = new Uint8Array(buffer);
      const { text } = await extractText(uint8Array);
      
      // unpdf pode retornar um array de strings (uma por página)
      const joinedText = Array.isArray(text) ? text.join("\n") : text;
      
      if (!joinedText || joinedText.trim().length === 0) {
        throw new Error("O PDF parece estar vazio ou é uma imagem (OCR não suportado).");
      }
      
      return joinedText;
    } catch (err: any) {
      console.error("Erro no unpdf:", err);
      throw new Error(`Erro ao ler PDF: ${err.message}`);
    }
  } 
  
  if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    try {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } catch (err: any) {
      console.error("Erro no mammoth:", err);
      throw new Error("Falha ao extrair texto do DOCX.");
    }
  }

  throw new Error('Formato de arquivo não suportado. Use PDF ou DOCX.');
}
