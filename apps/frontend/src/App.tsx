import { Chat } from "@/components/chat/chat";
import { Sidebar } from "@/components/ui/sidebar";
import { PromptManager } from "./components/manage-prompts/prompt-manager";

const App = () => {
  return (
    <div className="flex h-screen">
      <Sidebar>
        <PromptManager />
      </Sidebar>
      <div className="flex flex-col flex-1">
        <header className="border-b bg-background flex items-center justify-center h-14 w-full flex-none">
          <h1 className="text-lg font-semibold">
            LLM Chat{" "}
            <span className="text-sm text-muted-foreground">v1.0</span>
          </h1>
        </header>
        <main className="flex-1 min-h-0">
          <Chat />
        </main>
      </div>
    </div>
  );
};

export default App;
