import { useState, useEffect } from 'react';
import { Button } from "/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "/components/ui/card";
import { Label } from "/components/ui/label";
import { Input } from "/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "/components/ui/radio-group";

const EmergencyCoordinatorApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'ambulance' | 'traffic' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emergencyLevel, setEmergencyLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [selectedRoute, setSelectedRoute] = useState<{id: number, name: string} | null>(null);
  const [routeStatus, setRouteStatus] = useState<'pending' | 'cleared' | 'optimized'>('pending');
  const [optimizedRoute, setOptimizedRoute] = useState<string | null>(null);
  
  // Simulated routes data
  const routes = [
    { id: 1, name: 'Route A: Main Street to Hospital', time: '15 min', traffic: 'Heavy' },
    { id: 2, name: 'Route B: Highway Express', time: '12 min', traffic: 'Medium' },
    { id: 3, name: 'Route C: Shortcut Through Downtown', time: '10 min', traffic: 'Light' },
  ];

  const handleLogin = () => {
    if (username === 'ambulance' && password === 'ambulance') {
      setIsLoggedIn(true);
      setUserType('ambulance');
    } else if (username === 'Trafic controler' && password === 'Trafic controler') {
      setIsLoggedIn(true);
      setUserType('traffic');
    } else {
      alert('Invalid credentials. Use "ambulance/ambulance" or "Trafic controler/Trafic controler"');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setUsername('');
    setPassword('');
    setSelectedRoute(null);
    setRouteStatus('pending');
    setOptimizedRoute(null);
  };

  const submitEmergencyRequest = () => {
    if (!selectedRoute) {
      alert('Please select a route first');
      return;
    }
    // Simulate sending data to traffic controller
    setRouteStatus('pending');
    alert(`Emergency request sent to traffic control. Level: ${emergencyLevel}`);
    
    // Simulate traffic controller processing (in a real app, this would be via backend)
    setTimeout(() => {
      setRouteStatus('cleared');
      // Determine optimized route based on emergency level
      let optimized = '';
      if (emergencyLevel === 'high') {
        optimized = 'Route C: Shortcut Through Downtown (Emergency Lane Activated)';
      } else if (emergencyLevel === 'medium') {
        optimized = 'Route B: Highway Express (Priority Lane)';
      } else {
        optimized = 'Route A: Main Street (Normal Priority)';
      }
      setOptimizedRoute(optimized);
    }, 2000);
  };

  const clearRoute = () => {
    setRouteStatus('cleared');
    alert('Route cleared and traffic redirected');
  };

  const suggestOptimizedRoute = () => {
    // Find the best route based on emergency level
    let bestRoute = '';
    if (emergencyLevel === 'high') {
      bestRoute = 'Route C: Shortcut Through Downtown (Emergency Lane Activated)';
    } else if (emergencyLevel === 'medium') {
      bestRoute = 'Route B: Highway Express (Priority Lane)';
    } else {
      bestRoute = 'Route A: Main Street (Normal Priority)';
    }
    setOptimizedRoute(bestRoute);
    setRouteStatus('optimized');
    alert(`Optimized route suggested: ${bestRoute}`);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Emergency Coordinator Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={handleLogin}>
              Login
            </Button>
            <div className="text-sm text-muted-foreground text-center">
              <p>Ambulance: ambulance/ambulance</p>
              <p>Traffic Controller: Trafic controler/Trafic controler</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {userType === 'ambulance' ? 'Ambulance Emergency System' : 'Traffic Control Center'}
          </h1>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {userType === 'ambulance' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Map Section */}
            <Card>
              <CardHeader>
                <CardTitle>Select Emergency Route</CardTitle>
                <CardDescription>
                  Click on a route to select it for emergency response
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg h-64 relative overflow-hidden">
                  <img 
                    src="https://placeholder-image-service.onrender.com/image/600x400?prompt=City%20map%20with%20multiple%20routes%20and%20traffic%20patterns&id=7c3486de-e4db-497f-a3d3-3e172ba917e6" 
                    alt="City map showing three different routes with traffic indicators and hospital location" 
                    className="w-full h-full object-cover"
                  />
                  {/* Route indicators */}
                  <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-2 py-1 rounded text-sm">
                    Hospital
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  {routes.map(route => (
                    <div 
                      key={route.id}
                      className={`p-3 rounded border cursor-pointer transition-all ${
                        selectedRoute?.id === route.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:bg-accent'
                      }`}
                      onClick={() => setSelectedRoute(route)}
                    >
                      <div className="font-medium">{route.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Estimated: {route.time} • Traffic: {route.traffic}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Controls Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Details</CardTitle>
                  <CardDescription>
                    Set the emergency level and submit request to traffic control
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Emergency Level</Label>
                    <RadioGroup 
                      value={emergencyLevel} 
                      onValueChange={(value: 'low' | 'medium' | 'high') => setEmergencyLevel(value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="low" />
                        <Label htmlFor="low" className="text-green-600">Low</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium" className="text-yellow-600">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="high" />
                        <Label htmlFor="high" className="text-red-600">High</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Selected Route</Label>
                    <div className="p-3 bg-muted rounded">
                      {selectedRoute ? selectedRoute.name : 'No route selected'}
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={submitEmergencyRequest}
                    disabled={!selectedRoute}
                  >
                    Submit Emergency Request
                  </Button>

                  {routeStatus !== 'pending' && (
                    <div className={`p-3 rounded ${
                      routeStatus === 'cleared' ? 'bg-green-100 text-green-800' : 
                      routeStatus === 'optimized' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      <strong>Status: </strong>
                      {routeStatus === 'cleared' ? 'Route Cleared by Traffic Control' : 
                       routeStatus === 'optimized' ? 'Optimized Route Provided' : 'Pending...'}
                      
                      {optimizedRoute && (
                        <div className="mt-2">
                          <strong>Optimized Route: </strong>{optimizedRoute}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Protocols</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-start">
                    <div className={`w-3 h-3 rounded-full mt-1 mr-2 ${
                      emergencyLevel === 'high' ? 'bg-red-500' : 'bg-gray-300'
                    }`}></div>
                    <div>
                      <strong>High Emergency:</strong> All traffic cleared, police escort available
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className={`w-3 h-3 rounded-full mt-1 mr-2 ${
                      emergencyLevel === 'medium' ? 'bg-yellow-500' : 'bg-gray-300'
                    }`}></div>
                    <div>
                      <strong>Medium Emergency:</strong> Priority lane access, traffic signals overridden
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className={`w-3 h-3 rounded-full mt-1 mr-2 ${
                      emergencyLevel === 'low' ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                    <div>
                      <strong>Low Emergency:</strong> Normal priority with route guidance
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          // Traffic Controller Interface
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Control Map</CardTitle>
                <CardDescription>
                  Monitor and manage emergency routes in the city
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg h-96 relative overflow-hidden">
                  <img 
                    src="https://placeholder-image-service.onrender.com/image/600x500?prompt=Traffic%20control%20dashboard%20with%20city%20map%2C%20route%20visualization%2C%20and%20traffic%20flow%20indicators&id=7c3486de-e4db-497f-a3d3-3e172ba917e6" 
                    alt="Traffic control dashboard showing city map with traffic flow, congestion areas, and emergency route highlighted in red" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Status indicators */}
                  {selectedRoute && (
                    <>
                      <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-2 py-1 rounded text-sm">
                        Emergency Route: {selectedRoute.name}
                      </div>
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-2 py-1 rounded text-sm">
                        Level: {emergencyLevel.toUpperCase()}
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Request</CardTitle>
                  <CardDescription>
                    {selectedRoute 
                      ? `Ambulance has requested route clearance` 
                      : 'No active emergency requests'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedRoute ? (
                    <>
                      <div className="space-y-2">
                        <Label>Requested Route</Label>
                        <div className="p-3 bg-muted rounded">
                          {selectedRoute.name}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Emergency Level</Label>
                        <div className={`p-3 rounded font-medium ${
                          emergencyLevel === 'high' ? 'bg-red-100 text-red-800' : 
                          emergencyLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {emergencyLevel.toUpperCase()}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button onClick={clearRoute}>
                          Clear Route
                        </Button>
                        <Button variant="outline" onClick={suggestOptimizedRoute}>
                          Suggest Optimized Route
                        </Button>
                      </div>
                      
                      {optimizedRoute && (
                        <div className="p-3 bg-blue-100 text-blue-800 rounded">
                          <strong>Optimized Route Suggested:</strong> {optimizedRoute}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      Waiting for emergency requests from ambulances...
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Traffic Management Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full">
                    Override Traffic Signals
                  </Button>
                  <Button variant="outline" className="w-full">
                    Dispatch Police Escort
                  </Button>
                  <Button variant="outline" className="w-full">
                    Alert Nearby Vehicles
                  </Button>
                  <Button variant="outline" className="w-full">
                    View Traffic Cameras
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EmergencyCoordinatorApp;
