
import { useState } from "react"
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "./ui/button"
import { Activity, BarChart3, Calendar as CalendarIcon, Download, PieChart as PieChartIcon } from "lucide-react"

// Mock data for visualizations
const moodData = [
  { name: "Mon", value: 3, fullName: "Monday" },
  { name: "Tue", value: 2, fullName: "Tuesday" },
  { name: "Wed", value: 4, fullName: "Wednesday" },
  { name: "Thu", value: 3, fullName: "Thursday" },
  { name: "Fri", value: 5, fullName: "Friday" },
  { name: "Sat", value: 4, fullName: "Saturday" },
  { name: "Sun", value: 3, fullName: "Sunday" },
]

const assessmentData = [
  { name: "Week 1", score: 45 },
  { name: "Week 2", score: 52 },
  { name: "Week 3", score: 49 },
  { name: "Week 4", score: 63 },
  { name: "Week 5", score: 58 },
  { name: "Week 6", score: 72 },
]

const emotionData = [
  { name: "Happy", value: 35 },
  { name: "Neutral", value: 40 },
  { name: "Sad", value: 15 },
  { name: "Anxious", value: 10 },
]

const EMOTION_COLORS = {
  Happy: "#8BC34A",
  Neutral: "#33C3F0",
  Sad: "#8E9196",
  Anxious: "#FFAB91",
}

export function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  
  return (
    <div className="container max-w-6xl py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Your Wellbeing Dashboard</h1>
      <p className="text-muted-foreground mb-8">Track your progress and emotional patterns over time</p>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="overview">
            <Activity className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="assessments">
            <BarChart3 className="h-4 w-4 mr-2" />
            Assessments
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Calendar
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Latest MHQoL Score</CardTitle>
                <div className="h-4 w-4 rounded-full bg-serenity-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72%</div>
                <p className="text-xs text-muted-foreground">+14% from previous assessment</p>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="mr-2 h-3 w-3" />
                    Download Report
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Chat Sessions</CardTitle>
                <div className="h-4 w-4 rounded-full bg-serenity-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Last session: Today at 10:30 AM</p>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href="/chat">Continue Conversation</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Weekly Streak</CardTitle>
                <div className="h-4 w-4 rounded-full bg-serenity-peach" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6 days</div>
                <p className="text-xs text-muted-foreground">Keep it up for a perfect week!</p>
                <div className="mt-4 flex gap-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 h-2 rounded-full ${i < 6 ? "bg-serenity-peach" : "bg-muted"}`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Mood Tracker</CardTitle>
                <CardDescription>Your emotional state over the past 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      width={500}
                      height={300}
                      data={moodData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
                      <Tooltip 
                        formatter={(value, name) => [`Level ${value}/5`, "Mood"]}
                        labelFormatter={(label, data) => data[0].payload.fullName}
                      />
                      <Bar dataKey="value" fill="#33C3F0" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Emotion Distribution</CardTitle>
                <CardDescription>Your detected emotions across chat sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={emotionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {emotionData.map((entry) => (
                          <Cell 
                            key={`cell-${entry.name}`} 
                            fill={EMOTION_COLORS[entry.name as keyof typeof EMOTION_COLORS]} 
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value} instances`, "Frequency"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="assessments">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Progress</CardTitle>
              <CardDescription>
                Your MHQoL-7D scores over time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={assessmentData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#33C3F0"
                      strokeWidth={3}
                      dot={{ r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="bg-serenity-gray-light rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center">
                  <PieChartIcon className="h-4 w-4 mr-2 text-serenity-blue" />
                  Insights
                </h4>
                <p className="text-sm text-muted-foreground">
                  Your wellbeing score has improved by 27 points over the last 6 weeks. 
                  The most significant improvement was between weeks 3 and 4.
                </p>
              </div>
              
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Assessment History
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Wellness Calendar</CardTitle>
              <CardDescription>
                View your activity and scheduled check-ins
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="bg-serenity-gray-light rounded-lg p-4">
                  <h3 className="font-medium">
                    {date?.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </h3>
                  
                  <div className="mt-4 space-y-2">
                    <div className="bg-white p-3 rounded-lg border border-border flex items-start">
                      <div className="h-2 w-2 rounded-full bg-serenity-blue mt-1.5 mr-2" />
                      <div>
                        <p className="text-sm font-medium">Morning Check-in</p>
                        <p className="text-xs text-muted-foreground">9:00 AM - Completed</p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-border flex items-start">
                      <div className="h-2 w-2 rounded-full bg-serenity-green mt-1.5 mr-2" />
                      <div>
                        <p className="text-sm font-medium">Breathing Exercise</p>
                        <p className="text-xs text-muted-foreground">1:30 PM - Completed</p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-border flex items-start">
                      <div className="h-2 w-2 rounded-full bg-serenity-peach mt-1.5 mr-2" />
                      <div>
                        <p className="text-sm font-medium">Evening Reflection</p>
                        <p className="text-xs text-muted-foreground">8:00 PM - Upcoming</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Schedule New Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
