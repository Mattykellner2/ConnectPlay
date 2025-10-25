import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Calendar, Clock, MapPin, Users, CheckCircle, XCircle, Mail, Video } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { SpeakerBooking } from "@shared/schema";

export default function SpeakerInvitations() {
  const { toast } = useToast();
  // TODO: Replace with actual professional ID from auth/session
  const professionalId = "prof-temp-id";

  const { data: bookings, isLoading } = useQuery<SpeakerBooking[]>({
    queryKey: ["/api/bookings", { professionalId }],
    queryFn: async () => {
      const params = new URLSearchParams({ professionalId });
      const response = await fetch(`/api/bookings?${params}`);
      if (!response.ok) throw new Error("Failed to fetch bookings");
      return response.json();
    },
  });

  const acceptMutation = useMutation({
    mutationFn: async (bookingId: string) => {
      const response = await apiRequest("PATCH", `/api/bookings/${bookingId}/accept`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Invitation Accepted!",
        description: "Zoom meeting created. Check your email for details.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to Accept",
        description: error.message || "Could not accept invitation. Please try again.",
      });
    },
  });

  const declineMutation = useMutation({
    mutationFn: async (bookingId: string) => {
      const response = await apiRequest("PATCH", `/api/bookings/${bookingId}/decline`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Invitation Declined",
        description: "The professor has been notified.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to Decline",
        description: error.message || "Could not decline invitation. Please try again.",
      });
    },
  });

  const pendingBookings = bookings?.filter((b) => b.status === "pending") || [];
  const acceptedBookings = bookings?.filter((b) => b.status === "accepted") || [];
  const declinedBookings = bookings?.filter((b) => b.status === "declined") || [];

  const renderBookingCard = (booking: SpeakerBooking, showActions: boolean = false) => {
    const statusColors = {
      pending: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
      accepted: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      declined: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    };

    return (
      <Card key={booking.id} className="hover-elevate" data-testid={`card-booking-${booking.id}`}>
        <CardHeader>
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <CardTitle className="text-xl mb-2">{booking.eventTitle}</CardTitle>
              <CardDescription className="text-base">
                {booking.professorName} • {booking.universityName}
              </CardDescription>
            </div>
            <Badge className={statusColors[booking.status as keyof typeof statusColors]} data-testid={`badge-status-${booking.status}`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>{booking.eventDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{booking.eventTime} ({booking.eventDuration} min)</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{booking.eventType.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}</span>
            </div>
            {booking.audienceSize && (
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span>{booking.audienceSize} students</span>
              </div>
            )}
          </div>

          {booking.className && (
            <div className="bg-muted p-3 rounded-lg">
              <span className="text-sm font-medium">Class:</span>
              <span className="text-sm ml-2">{booking.className}</span>
            </div>
          )}

          {booking.eventDescription && (
            <div className="text-sm text-muted-foreground border-l-4 border-primary pl-3">
              {booking.eventDescription}
            </div>
          )}

          {booking.status === "accepted" && booking.zoomMeetingLink && (
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-blue-900 dark:text-blue-100 font-semibold">
                <Video className="w-5 h-5" />
                <span>Zoom Meeting Ready</span>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => window.open(booking.zoomMeetingLink!, "_blank")}
                  data-testid="button-join-zoom"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Join Meeting
                </Button>
                {booking.zoomMeetingPassword && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Password:</span>
                    <code className="bg-background px-2 py-1 rounded border font-mono">
                      {booking.zoomMeetingPassword}
                    </code>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="w-3 h-3" />
            <span>Contact: {booking.professorEmail}</span>
          </div>
        </CardContent>

        {showActions && booking.status === "pending" && (
          <CardFooter className="flex gap-3">
            <Button
              onClick={() => acceptMutation.mutate(booking.id)}
              disabled={acceptMutation.isPending || declineMutation.isPending}
              className="flex-1"
              data-testid="button-accept-booking"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {acceptMutation.isPending ? "Accepting..." : "Accept Invitation"}
            </Button>
            <Button
              onClick={() => declineMutation.mutate(booking.id)}
              disabled={acceptMutation.isPending || declineMutation.isPending}
              variant="outline"
              className="flex-1"
              data-testid="button-decline-booking"
            >
              <XCircle className="w-4 h-4 mr-2" />
              {declineMutation.isPending ? "Declining..." : "Decline"}
            </Button>
          </CardFooter>
        )}
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4 p-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Speaking Invitations</h1>
        <p className="text-muted-foreground">
          Manage your speaking engagements and guest lecture invitations from universities.
        </p>
      </div>

      <Tabs defaultValue="pending" className="w-full" data-testid="tabs-invitations">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="pending" data-testid="tab-pending">
            Pending ({pendingBookings.length})
          </TabsTrigger>
          <TabsTrigger value="accepted" data-testid="tab-accepted">
            Accepted ({acceptedBookings.length})
          </TabsTrigger>
          <TabsTrigger value="declined" data-testid="tab-declined">
            Declined ({declinedBookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4 mt-6">
          {pendingBookings.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Pending Invitations</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  You're all caught up! New speaking invitations will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            pendingBookings.map((booking) => renderBookingCard(booking, true))
          )}
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4 mt-6">
          {acceptedBookings.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Accepted Invitations</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  Accepted speaking engagements will appear here with Zoom meeting links.
                </p>
              </CardContent>
            </Card>
          ) : (
            acceptedBookings.map((booking) => renderBookingCard(booking, false))
          )}
        </TabsContent>

        <TabsContent value="declined" className="space-y-4 mt-6">
          {declinedBookings.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <XCircle className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Declined Invitations</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  Invitations you've declined will appear here for your records.
                </p>
              </CardContent>
            </Card>
          ) : (
            declinedBookings.map((booking) => renderBookingCard(booking, false))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
