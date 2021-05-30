import React from 'react'
import { BlocksControls, InlineBlocks } from 'react-tinacms-inline'
import { featureBlock } from './Feature'
import { SimpleGrid } from '@chakra-ui/react'

/**
 * 1. Define the Block Component
 */
function FeatureList({ index }) {
    return (
        <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
            <SimpleGrid>
                <InlineBlocks name="features" blocks={FEATURE_BLOCKS} direction="row" className="feature-list" />
            </SimpleGrid>
        </BlocksControls>
    )
}

/**
 * 2. Define the FeatureList Block
 */
export const featureListBlock = {
    Component: FeatureList,
    template: {
        label: 'Feature List',
        defaultItem: {
            _template: 'features',
            features: [
                {
                    _template: 'feature',
                    heading: 'heading 1',
                    supporting_copy: 'supporting copy',
                },
                {
                    _template: 'feature',
                    heading: 'heading 2',
                    supporting_copy: 'supporting copy',
                },
                {
                    _template: 'feature',
                    heading: 'heading 3',
                    supporting_copy: 'supporting copy',
                },
            ],
        },
        fields: [],
    },
}

/**
 * 3. Define the block options
 * for FeatureList to render, we will add
 * a block to this next
 */
const FEATURE_BLOCKS = {
    feature: featureBlock,
}
