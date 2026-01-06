'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const days = [
  { day: 'Today', date: '06 Jan', progress: '1/4' },
  { day: 'Tom', date: '07 Jan', progress: '0/4' },
  { day: 'Thu', date: '08 Jan', progress: '0/4' },
  { day: 'Fri', date: '09 Jan', progress: '0/4' },
];

const menu = {
    breakfast: [
        { id: 'item-1', name: 'Aloo Paratha with Curd', description: 'Whole wheat flatbread stuffed with spiced potatoes, served with yogurt.', image: 'https://picsum.photos/seed/food1/100/100', default: true },
        { id: 'item-2', name: 'Poha', description: 'Flattened rice with onions, potatoes, and spices.', image: 'https://picsum.photos/seed/food2/100/100' },
        { id: 'item-3', name: 'Skip Breakfast', description: 'Help us cut down food wastage' },
    ],
    lunch: [
        { id: 'lunch-1', name: 'Rajma Chawal', description: 'Red kidney bean curry with steamed rice.', image: 'https://picsum.photos/seed/food3/100/100', default: true },
        { id: 'lunch-2', name: 'Kadai Paneer & Roti', description: 'Indian cottage cheese in a spicy tomato-based gravy.', image: 'https://picsum.photos/seed/food4/100/100' },
    ],
    snacks: [
        { id: 'snacks-1', name: 'Samosa with Chutney', description: 'Fried pastry with a savory filling of spiced potatoes, onions, and peas.', image: 'https://picsum.photos/seed/food5/100/100', default: true },
        { id: 'snacks-2', name: 'Vada Pav', description: 'Deep-fried potato dumpling placed inside a bread bun.', image: 'https://picsum.photos/seed/food6/100/100' },
    ],
    dinner: [
        { id: 'dinner-1', name: 'Chicken Biryani', description: 'A savory chicken and rice dish with spices.', image: 'https://picsum.photos/seed/food7/100/100', default: true },
        { id: 'dinner-2', name: 'Dal Makhani with Naan', description: 'Creamy lentils with butter and spices, served with flatbread.', image: 'https://picsum.photos/seed/food8/100/100' },
    ]
};

type MenuItem = {
    id: string;
    name: string;
    description: string;
    image?: string;
    default?: boolean;
}

export function FoodMenuCard() {
    const [selectedDay, setSelectedDay] = useState('Today');
    const [selectedMeal, setSelectedMeal] = useState<{[key: string]: string}>({
        breakfast: 'item-1',
        lunch: 'lunch-1',
        snacks: 'snacks-1',
        dinner: 'dinner-1',
    });

    const handleSelectMeal = (mealType: string, itemId: string) => {
        setSelectedMeal(prev => ({...prev, [mealType]: itemId}));
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Menu for the week</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {days.map((day) => (
            <Button
              key={day.day}
              variant={selectedDay === day.day ? 'default' : 'outline'}
              className="h-auto w-full p-4 flex flex-col items-start"
              onClick={() => setSelectedDay(day.day)}
            >
              <div className="font-semibold">{day.day}</div>
              <div className="text-sm">{day.date}</div>
              <div className="mt-2 text-xs py-0.5 px-1.5 rounded-full bg-background/20">{day.progress}</div>
            </Button>
          ))}
        </div>

        <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800 mb-6">
            <Clock className="h-4 w-4 !text-red-800" />
            <AlertDescription>
                Your window to set preferences closed at 5:30 PM yesterday
            </AlertDescription>
        </Alert>

        <Tabs defaultValue="breakfast" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
                <TabsTrigger value="lunch">Lunch</TabsTrigger>
                <TabsTrigger value="snacks">Snacks</TabsTrigger>
                <TabsTrigger value="dinner">Dinner</TabsTrigger>
            </TabsList>
            <TabsContent value="breakfast">
                <RadioGroup value={selectedMeal.breakfast} onValueChange={(value) => handleSelectMeal('breakfast', value)}>
                    <div className="space-y-4 pt-4">
                        {menu.breakfast.map((item) => (
                            <Label key={item.id} htmlFor={item.id} className={cn("flex items-center gap-4 rounded-lg border p-4 transition-all cursor-pointer", selectedMeal.breakfast === item.id && "bg-accent/10 border-accent")}>
                                {item.image && (
                                    <Image data-ai-hint="food meal" src={item.image} alt={item.name} width={64} height={64} className="rounded-full" />
                                )}
                                {!item.image && item.name.toLowerCase().includes('skip') && (
                                     <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                                        <Info className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                )}
                                <div className="flex-1">
                                    {item.default && <Badge variant="secondary" className="mb-1">Default</Badge>}
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                                <RadioGroupItem value={item.id} id={item.id} />
                            </Label>
                        ))}
                    </div>
                </RadioGroup>
            </TabsContent>
             <TabsContent value="lunch">
                <RadioGroup value={selectedMeal.lunch} onValueChange={(value) => handleSelectMeal('lunch', value)}>
                    <div className="space-y-4 pt-4">
                        {menu.lunch.map((item) => (
                            <Label key={item.id} htmlFor={item.id} className={cn("flex items-center gap-4 rounded-lg border p-4 transition-all cursor-pointer", selectedMeal.lunch === item.id && "bg-accent/10 border-accent")}>
                                {item.image && (
                                    <Image data-ai-hint="indian food" src={item.image} alt={item.name} width={64} height={64} className="rounded-full" />
                                )}
                                <div className="flex-1">
                                    {item.default && <Badge variant="secondary" className="mb-1">Default</Badge>}
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                                <RadioGroupItem value={item.id} id={item.id} />
                            </Label>
                        ))}
                    </div>
                </RadioGroup>
            </TabsContent>
            <TabsContent value="snacks">
                <RadioGroup value={selectedMeal.snacks} onValueChange={(value) => handleSelectMeal('snacks', value)}>
                    <div className="space-y-4 pt-4">
                        {menu.snacks.map((item) => (
                            <Label key={item.id} htmlFor={item.id} className={cn("flex items-center gap-4 rounded-lg border p-4 transition-all cursor-pointer", selectedMeal.snacks === item.id && "bg-accent/10 border-accent")}>
                                {item.image && (
                                    <Image data-ai-hint="indian snacks" src={item.image} alt={item.name} width={64} height={64} className="rounded-full" />
                                )}
                                <div className="flex-1">
                                    {item.default && <Badge variant="secondary" className="mb-1">Default</Badge>}
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                                <RadioGroupItem value={item.id} id={item.id} />
                            </Label>
                        ))}
                    </div>
                </RadioGroup>
            </TabsContent>
            <TabsContent value="dinner">
                <RadioGroup value={selectedMeal.dinner} onValueChange={(value) => handleSelectMeal('dinner', value)}>
                    <div className="space-y-4 pt-4">
                        {menu.dinner.map((item) => (
                            <Label key={item.id} htmlFor={item.id} className={cn("flex items-center gap-4 rounded-lg border p-4 transition-all cursor-pointer", selectedMeal.dinner === item.id && "bg-accent/10 border-accent")}>
                                {item.image && (
                                    <Image data-ai-hint="indian dinner" src={item.image} alt={item.name} width={64} height={64} className="rounded-full" />
                                )}
                                <div className="flex-1">
                                    {item.default && <Badge variant="secondary" className="mb-1">Default</Badge>}
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                                <RadioGroupItem value={item.id} id={item.id} />
                            </Label>
                        ))}
                    </div>
                </RadioGroup>
            </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
