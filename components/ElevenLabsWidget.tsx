
import React, { useEffect } from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                'agent-id': string;
            };
        }
    }
}

const ElevenLabsWidget = () => {
    return (
        <elevenlabs-convai agent-id="agent_1501kebbqdy6ekhrhyzss67sq84e"></elevenlabs-convai>
    );
};

export default ElevenLabsWidget;
