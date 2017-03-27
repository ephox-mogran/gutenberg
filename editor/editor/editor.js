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
						return;
					}

					return (
						<settings.edit
							key={ index }
							attributes={ block.attributes }
							onChange={ () => {} } />
					);
				} ) }
			</div>
			<InserterButton onClick={ toggleInserter } opened={ inserter.opened } />
		</div>
	);
};

export default Editor;
