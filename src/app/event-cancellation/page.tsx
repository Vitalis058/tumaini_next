import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Mail,
  Phone,
  RefreshCw,
  Shield,
  Users,
  XCircle,
} from "lucide-react";

export default function CancellationPolicy() {
  const participantCancellations = [
    {
      title: "Full Refund",
      timeframe: "7-14 days before",
      description:
        "Get your complete payment back when you cancel well in advance",
      color: "bg-green-500",
      textColor: "text-green-700 dark:text-green-300",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      borderColor: "border-green-200 dark:border-green-800",
      icon: CheckCircle,
      details: [
        "100% refund of all payments made",
        "No processing fees deducted",
        "Refund processed within 5-7 business days",
        "Original payment method will be credited",
      ],
    },
    {
      title: "Partial Refund",
      timeframe: "2-6 days before",
      description: "Receive 50-75% refund depending on costs already incurred",
      color: "bg-orange-500",
      textColor: "text-orange-700 dark:text-orange-300",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
      borderColor: "border-orange-200 dark:border-orange-800",
      icon: AlertCircle,
      details: [
        "50-75% refund based on upfront costs",
        "Accommodation and transport costs may be deducted",
        "Refund amount determined case by case",
        "Processing time: 7-10 business days",
      ],
    },
    {
      title: "No Refund",
      timeframe: "24-48 hours before",
      description:
        "Unfortunately, no refunds available due to committed expenses",
      color: "bg-red-500",
      textColor: "text-red-700 dark:text-red-300",
      bgColor: "bg-red-50 dark:bg-red-950/20",
      borderColor: "border-red-200 dark:border-red-800",
      icon: XCircle,
      details: [
        "All costs have been committed to suppliers",
        "Accommodation and meals already booked",
        "Transport arrangements finalized",
        "Consider rebooking options instead",
      ],
    },
    {
      title: "Rebooking Option",
      timeframe: "Alternative to refund",
      description: "Transfer your booking to a future date when possible",
      color: "bg-blue-500",
      textColor: "text-blue-700 dark:text-blue-300",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      icon: RefreshCw,
      details: [
        "Subject to availability on new dates",
        "May require additional payment for price differences",
        "Valid for up to 12 months from original date",
        "One-time transfer allowed per booking",
      ],
    },
  ];

  const organizerGuarantees = [
    {
      title: "Weather-Related Cancellations",
      description:
        "Safety first - we'll reschedule or refund if weather conditions are unsafe",
      icon: Shield,
      details: [
        "Full refund or free rescheduling",
        "Decision made 24-48 hours before departure",
        "Based on official weather warnings",
        "Your safety is our top priority",
      ],
    },
    {
      title: "Low Participation",
      description:
        "If we don't meet minimum group size, you get full flexibility",
      icon: Users,
      details: [
        "Full refund if minimum participants not met",
        "Alternative date options provided",
        "Notification given 48-72 hours in advance",
        "No penalties or fees applied",
      ],
    },
    {
      title: "Unforeseen Circumstances",
      description: "Natural disasters, guide illness, or other emergencies",
      icon: AlertCircle,
      details: [
        "Full refund or rescheduling offered",
        "Force majeure events covered",
        "Alternative arrangements when possible",
        "Clear communication throughout process",
      ],
    },
  ];

  const transferSteps = [
    {
      step: 1,
      title: "Contact Us",
      description: "Reach out as soon as you know you can't attend",
      icon: Phone,
    },
    {
      step: 2,
      title: "Provide Details",
      description:
        "Give us the new participant's information and contact details",
      icon: FileText,
    },
    {
      step: 3,
      title: "Confirmation",
      description: "We'll confirm the transfer and update our records",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Badge className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
                <Shield className="w-5 h-5 mr-2" />
                Cancellation Policy
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Clear & Fair
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Cancellation Terms
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              We believe in transparency. Understand our policies so you can
              plan your adventure with complete confidence.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* Participant Cancellations */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              When You Need to Cancel
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Life happens, and we understand. Here&apos;s what to expect based
              on when you cancel your booking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {participantCancellations.map((policy, index) => {
              const IconComponent = policy.icon;
              return (
                <Card
                  key={index}
                  className={`${policy.bgColor} ${policy.borderColor} border-2 hover:shadow-lg transition-all duration-300`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`p-3 rounded-full ${policy.color} text-white`}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className={`text-xl ${policy.textColor}`}>
                          {policy.title}
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className={`mt-1 ${policy.textColor} border-current`}
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          {policy.timeframe}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      {policy.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {policy.details.map((detail, detailIndex) => (
                        <li
                          key={detailIndex}
                          className="flex items-start gap-2 text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-current mt-2 flex-shrink-0 opacity-60" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Organizer Guarantees */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Guarantees to You
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              When we need to cancel or modify your adventure, here&apos;s what
              you can expect from us.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {organizerGuarantees.map((guarantee, index) => {
              const IconComponent = guarantee.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-lg">
                        {guarantee.title}
                      </CardTitle>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {guarantee.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {guarantee.details.map((detail, detailIndex) => (
                        <li
                          key={detailIndex}
                          className="flex items-start gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Transfer Process */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transfer Your Booking
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Can&apos;t make it? No problem! Transfer your spot to a friend or
              family member with these simple steps.
            </p>
          </div>

          <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                <RefreshCw className="w-6 h-6" />
                How to Transfer Your Reservation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {transferSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex items-center justify-center mb-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <IconComponent className="w-5 h-5" />
                        </div>
                      </div>
                      <h3 className="font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                      {index < transferSteps.length - 1 && (
                        <div className="hidden md:block absolute top-8 -right-3 text-muted-foreground">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <Separator className="my-6" />

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-500" />
                  Transfer Requirements
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>
                    • New participant must meet the same fitness and age
                    requirements
                  </li>
                  <li>
                    • Transfer must be completed at least 48 hours before the
                    hike
                  </li>
                  <li>• Original booker remains responsible for payment</li>
                  <li>• One transfer allowed per booking</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Section */}
        <section>
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-white/20">
                  <Mail className="w-8 h-8" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need Help with Your Booking?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Our team is here to help you navigate any changes to your
                adventure plans. Don&apos;t hesitate to reach out with questions
                or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Badge className="bg-white/20 text-white border-white/30 text-base px-6 py-3">
                  <Phone className="w-4 h-4 mr-2" />
                  +254 703 371 240
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 text-base px-6 py-3">
                  <Mail className="w-4 h-4 mr-2" />
                  info@tumainifitness.co.ke
                </Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Final CTA */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
            <CardContent className="p-8">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">
                Ready to Book Your Adventure?
              </h3>
              <p className="text-muted-foreground mb-6">
                Now that you understand our policies, you can book with
                confidence knowing exactly what to expect.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Badge className="bg-primary text-primary-foreground text-sm px-4 py-2">
                  <Shield className="w-4 h-4 mr-2" />
                  Fair & Transparent
                </Badge>
                <Badge className="bg-primary text-primary-foreground text-sm px-4 py-2">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Customer Focused
                </Badge>
                <Badge className="bg-primary text-primary-foreground text-sm px-4 py-2">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Flexible Options
                </Badge>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
