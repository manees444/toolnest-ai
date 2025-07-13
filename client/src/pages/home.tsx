import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Brain, Shield, Edit, FileText, ClipboardList, WandSparkles, Trash2, Copy, TriangleAlert, LoaderPinwheel, Info, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { GenerateSummaryRequest, SummaryResponse } from "@shared/schema";

export default function Home() {
  const [notes, setNotes] = useState("");
  const [tone, setTone] = useState<"formal" | "clinical" | "conversational">("formal");
  const [summary, setSummary] = useState("");
  const [carePlan, setCarePlan] = useState("");
  const { toast } = useToast();

  const generateMutation = useMutation({
    mutationFn: async (data: GenerateSummaryRequest): Promise<SummaryResponse> => {
      const response = await apiRequest("POST", "/api/generate-summary", data);
      return response.json();
    },
    onSuccess: (data) => {
      setSummary(data.summary);
      setCarePlan(data.carePlan);
      toast({
        title: "Summary Generated",
        description: "Professional session summary and care plan have been created.",
      });
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Unable to generate summary. Please check your connection and try again.",
        variant: "destructive",
      });
    },
  });

  const handleGenerate = () => {
    if (!notes.trim()) {
      toast({
        title: "Missing Notes",
        description: "Please enter session notes before generating summary.",
        variant: "destructive",
      });
      return;
    }

    generateMutation.mutate({ notes: notes.trim(), tone });
  };

  const handleClear = () => {
    setNotes("");
    setSummary("");
    setCarePlan("");
    toast({
      title: "Cleared",
      description: "All fields have been cleared.",
    });
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to Clipboard",
        description: `${type} has been copied to your clipboard.`,
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard. Please try selecting and copying manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* Header Section */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Therapist AI</h1>
                <p className="text-sm text-slate-600">Professional Session Summarizer</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-600">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Privacy-First • No Data Storage</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Privacy Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <TriangleAlert className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-amber-800 mb-1">Privacy Notice</h3>
              <p className="text-sm text-amber-700">
                Please avoid entering client names or any personally identifiable information. 
                This tool does not store any data and is designed to maintain client confidentiality.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Edit className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-slate-900">Session Notes Input</h2>
              </div>
              
              {/* Notes Textarea */}
              <div className="mb-6">
                <label htmlFor="sessionNotes" className="block text-sm font-medium text-slate-700 mb-2">
                  Rough Session Notes
                </label>
                <Textarea 
                  id="sessionNotes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={12}
                  className="resize-none text-sm"
                  placeholder="Enter your session notes here...

Example:
- Client discussed work stress and anxiety
- Explored coping mechanisms 
- Practiced breathing exercises
- Homework: daily journaling for 10 minutes
- Next session: review progress and discuss family dynamics"
                />
              </div>

              {/* Tone Selection */}
              <div className="mb-6">
                <label htmlFor="toneSelect" className="block text-sm font-medium text-slate-700 mb-2">
                  Summary Tone
                </label>
                <Select value={tone} onValueChange={(value: "formal" | "clinical" | "conversational") => setTone(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clinical">Clinical - Professional medical terminology</SelectItem>
                    <SelectItem value="formal">Formal - Professional but accessible language</SelectItem>
                    <SelectItem value="conversational">Conversational - Natural, easy-to-read style</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button 
                  onClick={handleGenerate}
                  disabled={generateMutation.isPending}
                  className="flex-1"
                >
                  {generateMutation.isPending ? (
                    <LoaderPinwheel className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <WandSparkles className="h-4 w-4 mr-2" />
                  )}
                  {generateMutation.isPending ? "Generating..." : "Generate Summary"}
                </Button>
                
                <Button 
                  variant="secondary"
                  onClick={handleClear}
                  disabled={generateMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Loading State */}
            {generateMutation.isPending && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-center space-x-3 text-primary">
                  <LoaderPinwheel className="h-5 w-5 animate-spin" />
                  <span className="font-medium">Generating professional summary...</span>
                </div>
                <div className="mt-4 bg-slate-100 rounded-lg p-3 text-sm text-slate-600 text-center">
                  This usually takes 5-10 seconds
                </div>
              </div>
            )}
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            {/* Session Summary Output */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-slate-900">Session Summary</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(summary, "Session Summary")}
                  disabled={!summary}
                  title="Copy to clipboard"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4 min-h-[200px] text-sm leading-relaxed border border-slate-200">
                {summary ? (
                  <div className="whitespace-pre-wrap">{summary}</div>
                ) : (
                  <div className="text-slate-500 italic">
                    Generated session summary will appear here...
                  </div>
                )}
              </div>
            </div>

            {/* Care Plan Output */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <ClipboardList className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-slate-900">Care Plan & Next Steps</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(carePlan, "Care Plan")}
                  disabled={!carePlan}
                  title="Copy to clipboard"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4 min-h-[200px] text-sm leading-relaxed border border-slate-200">
                {carePlan ? (
                  <div className="whitespace-pre-wrap">{carePlan}</div>
                ) : (
                  <div className="text-slate-500 italic">
                    Generated care plan and next steps will appear here...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Information */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
            <Info className="h-5 w-5 text-primary" />
            <span>How It Works</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="text-center">
              <div className="bg-primary/10 text-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Edit className="h-5 w-5" />
              </div>
              <h4 className="font-medium text-slate-900 mb-2">1. Input Notes</h4>
              <p className="text-slate-600">Paste your rough session notes and select the desired tone for the summary.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="h-5 w-5" />
              </div>
              <h4 className="font-medium text-slate-900 mb-2">2. AI Processing</h4>
              <p className="text-slate-600">Claude AI analyzes your notes and generates professional summaries and care plans.</p>
            </div>
            <div className="text-center">
              <div className="bg-slate-100 text-slate-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Copy className="h-5 w-5" />
              </div>
              <h4 className="font-medium text-slate-900 mb-2">3. Copy & Use</h4>
              <p className="text-slate-600">Copy the generated content directly to your clinical documentation system.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-slate-600">
            <div className="flex items-center space-x-4">
              <span>© 2024 Therapist AI</span>
              <span className="text-slate-400">•</span>
              <span className="flex items-center space-x-1">
                <Shield className="h-4 w-4 text-green-500" />
                <span>HIPAA Compliant Design</span>
              </span>
            </div>
            <div className="mt-4 sm:mt-0 text-xs text-slate-500">
              Powered by Claude AI • No data stored • Privacy-first architecture
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
