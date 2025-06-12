import {create} from 'zustand'

export const  useDiffentPhase = create<State & Actions>((set) => ({
    phase: 1,
    increment: () => set((state: { phase: number }) => ({ phase: state.phase + 1 })),
    reset:()=>set((state: { phase: number }) => ({ phase: 1 })),
    
    
  }))

  type State = {
    phase: number
  }
  
  type Actions = {
    increment: (qty: number) => void
    reset:()=>void
  }

// -----------------------------------------------------------------


type UserClass = {
  class: number;
  subject:string
};

type UserAction = {
  setClass: (qty: number) => void;
  setSubject:(q:string)=>void;
};

export const useUserDetails = create<UserClass & UserAction>((set) => ({
  class: 0,
  subject:'',
  setClass: (value: number) => set({ class: value }),
  setSubject: (value: string) => set({ subject: value }),

}));

// -----------------------------------------------------------------

// Define the shape of our quiz state, including a new 'initialize' method.


export interface Question {
  category?: string;
  question: string;
  options: string[];
  correct: number;
  fact?: string;
}

export interface QuizState {
  currentQuestion: number;
  userAnswers: (number | null)[];
  score: number;
  attempted: number;
  questions: Question[];
  // Initialize the store by providing the full questions array.
  initialize: (questions: Question[]) => void;
  answerQuestion: (index: number, correct: number) => void;
  // nextQuestion no longer requires totalQuestions as a parameter.
  nextQuestion: (onComplete: (score: number, attempted: number) => void) => void;
  previousQuestion: () => void;
}

export const useFirstPhaseQuizStore = create<QuizState>((set) => ({
  currentQuestion: 0,
  userAnswers: [],
  score: 0,
  attempted: 0,
  questions: [],
  initialize: (questions) =>
    set({
      currentQuestion: 0,
      userAnswers: new Array(questions.length).fill(null),
      score: 0,
      attempted: 0,
      questions,
    }),
  answerQuestion: (index, correct) =>
    set((state) => {
      // Only allow answering if no answer has been recorded for the current question.
      if (state.userAnswers[state.currentQuestion] != null) return state;
      const newAnswers = [...state.userAnswers];
      newAnswers[state.currentQuestion] = index;
      return {
        userAnswers: newAnswers,
        attempted: state.attempted + 1,
        score: index === correct ? state.score + 1 : state.score,
      };
    }),
  nextQuestion: (onComplete) =>
    set((state) => {
      if (state.currentQuestion < state.questions.length - 1) {
        return { currentQuestion: state.currentQuestion + 1 };
      } else {
        // If we're at the last question, call the onComplete callback.
        onComplete(state.score, state.attempted);
        return state;
      }
    }),
  previousQuestion: () =>
    set((state) => ({
      currentQuestion: Math.max(0, state.currentQuestion - 1),
    })),
}));





export const useFinalPhaseQuizStore = create<QuizState>((set) => ({
  currentQuestion: 0,
  userAnswers: [],
  score: 0,
  attempted: 0,
  questions: [],
  initialize: (questions) =>
    set({
      currentQuestion: 0,
      userAnswers: new Array(questions.length).fill(null),
      score: 0,
      attempted: 0,
      questions,
    }),
  answerQuestion: (index, correct) =>
    set((state) => {
      // Only allow answering if no answer has been recorded for the current question.
      if (state.userAnswers[state.currentQuestion] != null) return state;
      const newAnswers = [...state.userAnswers];
      newAnswers[state.currentQuestion] = index;
      return {
        userAnswers: newAnswers,
        attempted: state.attempted + 1,
        score: index === correct ? state.score + 1 : state.score,
      };
    }),
  nextQuestion: (onComplete) =>
    set((state) => {
      if (state.currentQuestion < state.questions.length - 1) {
        return { currentQuestion: state.currentQuestion + 1 };
      } else {
        // If we're at the last question, call the onComplete callback.
        onComplete(state.score, state.attempted);
        return state;
      }
    }),
  previousQuestion: () =>
    set((state) => ({
      currentQuestion: Math.max(0, state.currentQuestion - 1),
    })),
}));
