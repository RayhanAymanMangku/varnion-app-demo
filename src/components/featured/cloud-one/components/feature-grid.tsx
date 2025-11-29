import React from 'react'

export type FeatureItem = {
    id: number | string
    icon: React.ReactNode
    title: string
    description: string
}

type FeatureGridProps = {
    features: FeatureItem[]
}

const FeatureGrid = ({ features }: FeatureGridProps) => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {features.map((feature) => (
                <div
                    key={feature.id}
                    className="nebula-card p-6 rounded-xl hover:border transition-all duration-300"
                >
                    <div className="mb-4">
                        {feature.icon}
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">
                        {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                        {feature.description}
                    </p>
                </div>
            ))}

        </div>
    )
}

export default FeatureGrid