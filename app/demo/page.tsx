

'use client'

import { Container } from '@chakra-ui/react'
import { useLogger } from '@/lib/logger/context' // Ensure you import useLogger
import FormComponent from '../components/forms/working/ContactForm'
import { BrokenForm } from '../components/forms/error/BrokenForm'
import { Carousel } from '../components/ui/Carousel'
import { AccordionDemo } from '../components/ui/AccordionDemo'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const carouselItems = [
  {
    title: 'Beautiful Landscapes',
    content: "Explore nature's wonders",
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
  },
  {
    title: 'Urban Architecture',
    content: 'Modern city living',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000'
  },
  {
    title: 'Technology',
    content: 'Innovation and progress',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475'
  }
]

export default function DemoPage() {
  const { log } = useLogger() // Using the logger here

  const handleTestAction = () => {
    log({
      type: 'action',
      message: 'Test action clicked',
      metadata: {
        timestamp: new Date().toISOString(),
        description: 'User initiated a test action from the demo page'
      }
    })
  }

  return (
    <Container maxW='container.lg' py={10}>
      <div className='space-y-8'>
        <Card>
          <CardHeader>
            <CardTitle>Component Demos</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue='working'>
              <TabsList>
                <TabsTrigger value='working'>Working Components</TabsTrigger>
                <TabsTrigger value='broken'>Error Components</TabsTrigger>
              </TabsList>

              <TabsContent value='working' className='space-y-8'>
                <section>
                  <h2 className='text-2xl font-bold mb-4'>Contact Form</h2>
                  <FormComponent />
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-4'>Image Carousel</h2>
                  <Carousel items={carouselItems} />
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-4'>FAQ Accordion</h2>
                  <AccordionDemo />
                </section>

                {/* Button to trigger the log action */}
                <button onClick={handleTestAction}>Trigger Test Action</button>
              </TabsContent>

              <TabsContent value='broken'>
                <section>
                  <h2 className='text-2xl font-bold mb-4'>
                    Broken Form Example
                  </h2>
                  <BrokenForm />
                </section>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
