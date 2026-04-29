import '../components/media-choice-card.css';
import { expect } from 'storybook/test';

const sampleSvg = (label, color) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="${color}" opacity=".2"/><rect x="16" y="16" width="48" height="48" rx="6" fill="${color}" opacity=".75"/><text x="40" y="46" text-anchor="middle" fill="white" font-size="12" font-weight="700">${label}</text></svg>`)}`;

export default { title: 'Components/MediaChoiceCard', tags: ['autodocs'] };

export const Effects = {
    render: () => {
        const root = document.createElement('div');
        root.innerHTML = `
            <div class="media-choice-cards">
                <button type="button" class="media-choice-card media-choice-card--selected">
                    <span class="media-choice-card__image-wrap"><img class="media-choice-card__image" src="${sampleSvg('3D', '#1C7264')}" alt="3D Spessorata"></span>
                    <span class="media-choice-card__label">3D Spessorata</span>
                </button>
                <button type="button" class="media-choice-card">
                    <span class="media-choice-card__image-wrap"><img class="media-choice-card__image" src="${sampleSvg('UV', '#F08A00')}" alt="UV Lucida"></span>
                    <span class="media-choice-card__label">UV Lucida</span>
                </button>
            </div>
        `;
        return root;
    },
    play: async ({ canvas }) => {
        await expect(canvas.getByRole('button', { name: /3D/i })).toHaveClass('media-choice-card--selected');
    }
};

export const CornerPreview = () => {
    const root = document.createElement('div');
    root.innerHTML = `
        <div class="media-choice-cards media-choice-cards--grid">
            ${['NO', 'R5', 'R6', 'R7', 'R8', 'R10'].map((label, index) => `
                <button type="button" class="media-choice-card${label === 'R8' ? ' media-choice-card--selected' : ''}">
                    <span class="media-choice-card__preview" style="border-radius:${index === 0 ? 0 : index + 4}px;">${label}</span>
                    <span class="media-choice-card__meta">${index === 0 ? 'No' : index + 4 + 'mm'}</span>
                </button>
            `).join('')}
        </div>
    `;
    return root;
};
