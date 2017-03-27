/**
 * Internal dependencies
 */
import InserterButton from '../inserter/button';

const Editor = ( { state: { blocks, inserter }, toggleInserter } ) => {
	return (
		<div>
			<div contentEditable>
				{ blocks.map( ( block, index ) => {
					let settings = wp.blocks.getBlockSettings( block.blockType );
					if ( ! settings ) {
						settings = wp.blocks.getBlockSettings( 'wp/generic' );
					}

					if ( ! settings ) {
						return;
					}

					return (
						<settings.edit
							key={ index }
							attributes={ wp.blocks.getBlockAttributes( block, settings ) }
							onChange={ () => {} } />
					);
				} ) }
			</div>
			<InserterButton onClick={ toggleInserter } opened={ inserter.opened } />
		</div>
	);
};

export default Editor;
