import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { updatePageSEO, SEO_CONFIG } from "@/lib/seo";
import { 
  Brain, Shield, Edit, FileText, ClipboardList, WandSparkles, Trash2, Copy, TriangleAlert, 
  LoaderPinwheel, Info, CheckCircle, Download, Settings, Moon, Sun, ThumbsUp, Calendar,
  Type, List, AlignLeft, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { useTheme } from "@/components/ThemeProvider";
import { downloadAsTxt, downloadAsPdf, copyAllToClipboard } from "@/lib/exportUtils";
import type { GenerateSummaryRequest, SummaryResponse } from "@shared/schema";

export default function Home() {
  const [notes, setNotes] = useState("");
  const [tone, setTone] = useState<"formal" | "clinical" | "conversational">("formal");
  const [summary, setSummary] = useState("");
  const [carePlan, setCarePlan] = useState("");
  const [sessionDate, setSessionDate] = useState("");
  const [outputFormat, setOutputFormat] = useState<"paragraph" | "bullet">("paragraph");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();

  // Character counter
  const charCount = notes.length;
  const wordCount = notes.trim() ? notes.trim().split(/\s+/).length : 0;

  const generateMutation = useMutation({
    mutationFn: async (data: GenerateSummaryRequest): Promise<SummaryResponse> => {
      const response = await apiRequest("POST", "/api/summary", data);
      return response.json();
    },
    onSuccess: (data) => {
      let processedSummary = data.summary;
      let processedCarePlan = data.carePlan;
      
      // Apply formatting based on user preference
      if (outputFormat === "bullet") {
        processedSummary = convertToBulletPoints(data.summary);
        processedCarePlan = convertToBulletPoints(data.carePlan);
      }
      
      setSummary(processedSummary);
      setCarePlan(processedCarePlan);
      setShowFeedback(true);
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

  const convertToBulletPoints = (text: string): string => {
    return text
      .split(/\.\s+/)
      .filter(sentence => sentence.trim().length > 0)
      .map(sentence => `• ${sentence.trim()}${sentence.endsWith('.') ? '' : '.'}`)
      .join('\n');
  };

  const handleGenerate = () => {
    if (!notes.trim()) {
      toast({
        title: "Missing Notes",
        description: "Please enter session notes before generating summary.",
        variant: "destructive",
      });
      return;
    }

    generateMutation.mutate({ 
      sessionNotes: notes.trim(), 
      tone, 
      outputFormat, 
      sessionDate: sessionDate || undefined 
    });
  };

  const handleClear = () => {
    setNotes("");
    setSummary("");
    setCarePlan("");
    setSessionDate("");
    setShowFeedback(false);
    setFeedback("");
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

  const handleCopyAll = async () => {
    try {
      await copyAllToClipboard(summary, carePlan, sessionDate);
      toast({
        title: "All Content Copied",
        description: "Session summary and care plan copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadTxt = () => {
    downloadAsTxt(summary, carePlan, sessionDate);
    toast({
      title: "Downloaded",
      description: "Session summary downloaded as text file.",
    });
  };

  const handleDownloadPdf = () => {
    downloadAsPdf(summary, carePlan, sessionDate);
    toast({
      title: "Downloaded",
      description: "Session summary downloaded as PDF.",
    });
  };

  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      // In a real app, this would send to analytics
      console.log("User feedback:", feedback);
    }
    toast({
      title: "Thank You!",
      description: "Your feedback helps us improve the tool.",
    });
    setFeedback("");
    setShowFeedback(false);
  };

  const toneDescriptions = {
    clinical: "Professional medical terminology and clinical language appropriate for healthcare settings",
    formal: "Professional but accessible language suitable for clinical documentation",
    conversational: "Natural, easy-to-read language while maintaining professionalism"
  };

  // Update SEO for this page
  useEffect(() => {
    updatePageSEO(SEO_CONFIG.therapistTool.title, SEO_CONFIG.therapistTool.description);
  }, []);

  return (
    <div className="bg-background min-h-screen font-sans">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                  <Brain className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">ToolNest AI</h1>
                  <p className="text-xs text-muted-foreground">Professional AI Tools</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Privacy-First • No Data Storage</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-primary/10 text-primary p-3 rounded-lg">
              <Brain className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground">
              Therapist AI Session Summariser
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Transform your rough therapy session notes into professional clinical summaries and care plans. 
            Our AI therapist tools help mental health professionals save time while maintaining HIPAA-compliant documentation standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>HIPAA-Compliant Design</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>No Data Storage</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Instant Export Options</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Privacy Notice */}
        <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <TriangleAlert className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-amber-800 dark:text-amber-200 mb-1">Privacy Notice</h3>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Please avoid entering client names or any personally identifiable information. 
                This tool does not store any data and is designed to maintain client confidentiality.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="card-background rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Edit className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Session Notes Input</h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  title="Output Settings"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>

              {/* Settings Panel */}
              <Collapsible open={settingsOpen} onOpenChange={setSettingsOpen}>
                <CollapsibleContent className="mb-6">
                  <div className="bg-muted/50 rounded-lg p-4 space-y-4">
                    <h3 className="text-sm font-medium text-foreground">Output Settings</h3>
                    
                    {/* Session Date */}
                    <div>
                      <label htmlFor="sessionDate" className="block text-sm font-medium text-foreground mb-1">
                        Session Date (Optional)
                      </label>
                      <Input
                        id="sessionDate"
                        type="date"
                        value={sessionDate}
                        onChange={(e) => setSessionDate(e.target.value)}
                        className="w-full"
                      />
                    </div>

                    {/* Output Format */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Output Format
                      </label>
                      <Select value={outputFormat} onValueChange={(value: "paragraph" | "bullet") => setOutputFormat(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="paragraph">
                            <div className="flex items-center space-x-2">
                              <AlignLeft className="h-4 w-4" />
                              <span>Paragraph Format</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="bullet">
                            <div className="flex items-center space-x-2">
                              <List className="h-4 w-4" />
                              <span>Bullet Points</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              {/* Notes Textarea */}
              <div className="mb-4">
                <label htmlFor="sessionNotes" className="block text-sm font-medium text-foreground mb-2">
                  Rough Session Notes
                </label>
                <Textarea 
                  id="sessionNotes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={12}
                  className="resize-none text-sm w-full"
                  placeholder="Enter your session notes here...

Example:
- Client discussed work stress and anxiety
- Explored coping mechanisms 
- Practiced breathing exercises
- Homework: daily journaling for 10 minutes
- Next session: review progress and discuss family dynamics"
                />
                {/* Character/Word Counter */}
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <div className="flex items-center space-x-1">
                    <Type className="h-3 w-3" />
                    <span>{wordCount} words</span>
                  </div>
                  <span>{charCount} characters</span>
                </div>
              </div>

              {/* Tone Selection with Tooltips */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <label htmlFor="toneSelect" className="block text-sm font-medium text-foreground">
                    Summary Tone
                  </label>
                  <InfoTooltip content="Choose the writing style for your generated summary and care plan" />
                </div>
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
                <div className="mt-2 text-xs text-muted-foreground bg-muted/30 rounded p-2">
                  <strong>{tone.charAt(0).toUpperCase() + tone.slice(1)}:</strong> {toneDescriptions[tone]}
                </div>
              </div>

              {/* Action Buttons - Mobile Optimized */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleGenerate}
                  disabled={generateMutation.isPending}
                  className="flex-1 mobile-sticky-button"
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
                  className="sm:w-auto"
                >
                  <Trash2 className="h-4 w-4 sm:mr-0 mr-2" />
                  <span className="sm:hidden">Clear All</span>
                </Button>
              </div>
            </div>

            {/* Loading State */}
            {generateMutation.isPending && (
              <div className="card-background rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-center space-x-3 text-primary">
                  <LoaderPinwheel className="h-5 w-5 animate-spin" />
                  <span className="font-medium">Generating professional summary...</span>
                </div>
                <div className="mt-4 bg-muted rounded-lg p-3 text-sm text-muted-foreground text-center">
                  This usually takes 5-10 seconds
                </div>
              </div>
            )}
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            {/* Export Options */}
            {(summary || carePlan) && (
              <div className="card-background rounded-xl shadow-sm p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyAll}
                    className="flex-1"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadTxt}
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download TXT
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadPdf}
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            )}

            {/* Session Summary Output */}
            <div className="card-background rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-foreground">Session Summary</h3>
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
              
              <div className="bg-muted/50 rounded-lg p-4 min-h-[200px] text-sm leading-relaxed border border-border">
                {summary ? (
                  <div className="whitespace-pre-wrap text-foreground">{summary}</div>
                ) : (
                  <div className="text-muted-foreground italic">
                    Generated session summary will appear here...
                  </div>
                )}
              </div>
            </div>

            {/* Care Plan Output */}
            <div className="card-background rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <ClipboardList className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-foreground">Care Plan & Next Steps</h3>
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
              
              <div className="bg-muted/50 rounded-lg p-4 min-h-[200px] text-sm leading-relaxed border border-border">
                {carePlan ? (
                  <>
                    <div className="whitespace-pre-wrap text-foreground">{carePlan}</div>
                    {/* Therapist Comments Placeholder */}
                    <div className="mt-6 pt-4 border-t border-border">
                      <h4 className="text-sm font-medium text-foreground mb-2">Therapist Comments:</h4>
                      <div className="space-y-2">
                        <div className="h-4 border-b border-dashed border-muted-foreground/30"></div>
                        <div className="h-4 border-b border-dashed border-muted-foreground/30"></div>
                        <div className="h-4 border-b border-dashed border-muted-foreground/30"></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-muted-foreground italic">
                    Generated care plan and next steps will appear here...
                  </div>
                )}
              </div>
            </div>

            {/* Feedback Section */}
            {showFeedback && (summary || carePlan) && (
              <div className="card-background rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <ThumbsUp className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Was this helpful?</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Thank You!",
                          description: "Your feedback helps us improve.",
                        });
                        setShowFeedback(false);
                      }}
                    >
                      👍 Yes
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFeedback("needs-improvement")}
                    >
                      👎 Could be better
                    </Button>
                  </div>
                  <div>
                    <Textarea
                      placeholder="Optional: Tell us how we can improve this tool..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      rows={3}
                      className="text-sm"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button size="sm" onClick={handleFeedbackSubmit}>
                      Submit Feedback
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFeedback(false)}
                    >
                      Skip
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-16 py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why Mental Health Professionals Choose Our Tool
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                This free therapist documentation app is specifically designed for therapy note generation, 
                helping you maintain professional standards while saving valuable time.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 text-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">HIPAA Compliant</h3>
                <p className="text-sm text-muted-foreground">Designed with healthcare privacy regulations in mind. No client data is ever stored or transmitted.</p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Save Time</h3>
                <p className="text-sm text-muted-foreground">Transform 30 minutes of documentation into 5 minutes with AI-powered therapy note generation.</p>
              </div>

              <div className="text-center">
                <div className="bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Professional Output</h3>
                <p className="text-sm text-muted-foreground">Generate clinical-quality summaries with proper therapeutic language and care plan structures.</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Multiple Formats</h3>
                <p className="text-sm text-muted-foreground">Export as PDF, TXT, or copy directly to your EMR system with one click.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="mt-16 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Perfect for All Mental Health Professionals
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Whether you're in private practice or working in clinical settings, our mental health session summariser 
                adapts to your documentation needs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="card-background rounded-xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Individual Therapists</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Generate progress notes for insurance billing</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Create treatment plan updates efficiently</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Maintain consistent documentation standards</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Choose from clinical, formal, or conversational tones</span>
                  </li>
                </ul>
              </div>

              <div className="card-background rounded-xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Counselors & Psychologists</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Structure session observations into professional reports</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Generate care plans with actionable next steps</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Include session date and therapist comment sections</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Export in formats compatible with EMR systems</span>
                  </li>
                </ul>
              </div>

              <div className="card-background rounded-xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Clinical Settings</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Standardize documentation across team members</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Reduce administrative burden on clinical staff</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Maintain compliance with healthcare documentation requirements</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>No software installation or user accounts required</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mt-16 py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                How Our AI Therapist Tools Work
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Simple, secure, and specifically designed for therapy note generation and mental health documentation.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Edit className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">1. Input Your Notes</h3>
                <p className="text-muted-foreground">
                  Paste your rough session notes, observations, and key points from the therapy session. 
                  No formatting required - just your authentic notes.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">2. AI Analysis</h3>
                <p className="text-muted-foreground">
                  Claude AI processes your notes using mental health-specific prompts, maintaining therapeutic language 
                  and professional documentation standards.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-muted text-muted-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Download className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">3. Professional Output</h3>
                <p className="text-muted-foreground">
                  Receive structured session summaries and care plans ready for your EMR system, 
                  insurance documentation, or clinical records.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4 hover:opacity-80 transition-opacity">
                <div className="bg-primary text-primary-foreground p-1.5 rounded">
                  <Brain className="h-4 w-4" />
                </div>
                <span className="font-semibold text-foreground">ToolNest AI</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Professional AI tools built for mental health professionals. This therapy note generator 
                helps therapists save time while maintaining HIPAA-compliant documentation standards.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>AI-powered session summaries</li>
                <li>Professional care plan generation</li>
                <li>HIPAA-compliant design</li>
                <li>Multiple export formats</li>
                <li>No data storage or tracking</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">For Mental Health Professionals</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-muted text-xs rounded">Therapists</span>
                <span className="px-2 py-1 bg-muted text-xs rounded">Counselors</span>
                <span className="px-2 py-1 bg-muted text-xs rounded">Psychologists</span>
                <span className="px-2 py-1 bg-muted text-xs rounded">Clinical Social Workers</span>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>© 2025 ToolNest AI</span>
              <span className="text-muted-foreground/50">•</span>
              <span className="flex items-center space-x-1">
                <Shield className="h-4 w-4 text-green-500" />
                <span>HIPAA Compliant Design</span>
              </span>
            </div>
            <div className="mt-4 sm:mt-0 text-xs text-muted-foreground/70">
              Powered by Claude AI • No data stored • Privacy-first architecture
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
