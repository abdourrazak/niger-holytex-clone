'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Minus, Plus } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'

interface ProductFiltersProps {
    categories: { name: string; count: number; href?: string }[]
    selectedCategories: string[]
    onCategoryChange: (category: string) => void
    priceRange: [number, number]
    onPriceChange: (range: [number, number]) => void
    className?: string
}

export function ProductFilters({
    categories,
    selectedCategories,
    onCategoryChange,
    priceRange,
    onPriceChange,
    className,
}: ProductFiltersProps) {
    return (
        <div className={className}>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Filtres</h3>
                    <p className="text-sm text-gray-500">Affinez votre recherche</p>
                </div>

                <Separator />

                <Accordion type="multiple" defaultValue={['categories', 'price']} className="w-full">
                    {/* Categories */}
                    <AccordionItem value="categories">
                        <AccordionTrigger className="text-sm font-medium text-gray-900 hover:no-underline">
                            Catégories
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-3 pt-2">
                                {categories.map((category) => (
                                    <div key={category.name} className="flex items-center space-x-2">
                                        {category.href ? (
                                            <Link
                                                href={category.href}
                                                className={`flex-1 flex justify-between items-center text-sm transition-colors py-1 ${selectedCategories.includes(category.name)
                                                    ? 'text-primary font-medium'
                                                    : 'text-gray-600 hover:text-primary'
                                                    }`}
                                            >
                                                <span>{category.name}</span>
                                                <span className="text-gray-400 text-xs">({category.count})</span>
                                            </Link>
                                        ) : (
                                            <>
                                                <Checkbox
                                                    id={`category-${category.name}`}
                                                    checked={selectedCategories.includes(category.name)}
                                                    onCheckedChange={() => onCategoryChange(category.name)}
                                                />
                                                <Label
                                                    htmlFor={`category-${category.name}`}
                                                    className="text-sm font-normal text-gray-600 cursor-pointer flex-1 flex justify-between"
                                                >
                                                    <span>{category.name}</span>
                                                    <span className="text-gray-400 text-xs">({category.count})</span>
                                                </Label>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Price Range */}
                    <AccordionItem value="price">
                        <AccordionTrigger className="text-sm font-medium text-gray-900 hover:no-underline">
                            Prix
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 pt-4 px-1">
                                <Slider
                                    defaultValue={[0, 50000]}
                                    max={50000}
                                    step={1000}
                                    value={priceRange}
                                    onValueChange={(value) => onPriceChange(value as [number, number])}
                                    className="my-4"
                                />
                                <div className="flex items-center justify-between">
                                    <div className="border rounded px-2 py-1 w-20 text-center text-sm">
                                        {priceRange[0].toLocaleString()} F
                                    </div>
                                    <span className="text-gray-400">-</span>
                                    <div className="border rounded px-2 py-1 w-20 text-center text-sm">
                                        {priceRange[1].toLocaleString()} F
                                    </div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Colors (Mockup) */}
                    <AccordionItem value="colors">
                        <AccordionTrigger className="text-sm font-medium text-gray-900 hover:no-underline">
                            Couleurs
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="grid grid-cols-5 gap-2 pt-2">
                                {['#000000', '#FFFFFF', '#1F2937', '#F3F4F6', '#D1D5DB', '#9CA3AF', '#4B5563', '#EF4444', '#F59E0B', '#10B981'].map((color, i) => (
                                    <button
                                        key={i}
                                        className="w-8 h-8 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                        style={{ backgroundColor: color }}
                                        title={color}
                                    />
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Sizes (Mockup) */}
                    <AccordionItem value="sizes">
                        <AccordionTrigger className="text-sm font-medium text-gray-900 hover:no-underline">
                            Tailles
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="grid grid-cols-3 gap-2 pt-2">
                                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                    <div key={size} className="flex items-center space-x-2">
                                        <Checkbox id={`size-${size}`} />
                                        <Label htmlFor={`size-${size}`} className="text-sm font-normal text-gray-600">
                                            {size}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Button
                    variant="outline"
                    className="w-full mt-6"
                    onClick={() => {
                        onCategoryChange('reset')
                        onPriceChange([0, 50000])
                    }}
                >
                    Réinitialiser les filtres
                </Button>
            </div>
        </div>
    )
}
