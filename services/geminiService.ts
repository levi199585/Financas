
import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types";

export const getFinancialAdvice = async (transactions: Transaction[], balance: number): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const summary = transactions.map(t => 
      `${t.description}: R$ ${t.amount} (${t.type === 'INCOME' ? 'Receita' : 'Despesa'})`
    ).join(', ');

    const prompt = `
      Você é um consultor financeiro pessoal expert chamado Finance+ AI.
      Com base no saldo atual de R$ ${balance.toFixed(2)} e nas seguintes transações recentes: ${summary}.
      
      Dê um conselho curto, motivador e prático em português para melhorar a saúde financeira desta pessoa.
      Use emojis. Seja conciso.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Continue focado em seus objetivos financeiros!";
  } catch (error) {
    console.error("Error fetching financial advice:", error);
    return "Não foi possível gerar dicas no momento. Mas continue economizando!";
  }
};
