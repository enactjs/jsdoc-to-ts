exports.a11yModule = [
	{
		'description': {
			'type': 'root',
			'children': [
				{
					'type': 'paragraph',
					'children': [
						{
							'type': 'text',
							'value': 'Provides a higher-order component to add accessibility utility features to a component.'
						}
					]
				}
			]
		},
		'tags': [
			{
				'title': 'module',
				'description': null,
				'type': null,
				'name': 'ui/A11yDecorator'
			},
			{
				'title': 'exports',
				'description': 'A11yDecorator'
			}
		],
		'augments': [],
		'examples': [],
		'params': [],
		'properties': [],
		'returns': [],
		'sees': [],
		'throws': [],
		'kind': 'module',
		'name': 'ui/A11yDecorator',
		'members': {
			'global': [],
			'inner': [],
			'instance': [],
			'events': [],
			'static': [
				{
					'description': {
						'type': 'root',
						'children': [
							{
								'type': 'paragraph',
								'children': [
									{
										'type': 'text',
										'value': 'A higher-order component that adds support for hint text to be read before and/or after the content.'
									}
								]
							},
							{
								'type': 'paragraph',
								'children': [
									{
										'type': 'text',
										'value': 'By default, the '
									},
									{
										'type': 'inlineCode',
										'value': 'children'
									},
									{
										'type': 'text',
										'value': ' prop is used as the source of the components content but may be\nconfigured by passing a different '
									},
									{
										'type': 'inlineCode',
										'value': 'prop'
									},
									{
										'type': 'text',
										'value': ' to the HOC configuration.'
									}
								]
							},
							{
								'type': 'paragraph',
								'children': [
									{
										'type': 'text',
										'value': 'Usage:'
									}
								]
							},
							{
								'type': 'code',
								'lang': null,
								'value': 'const MyComponent = A11yDecorator(MyComponentBase);\n\n// passes an aria-label property to MyComponentBase with accessibilityPreHint and\n// accessibilityHint wrapping children\n<MyComponent accessibilityPreHint="before children" accessibilityHint="after children">\n	{children}\n</MyComponent>'
							}
						]
					},
					'tags': [
						{
							'title': 'class',
							'description': null,
							'type': null,
							'name': 'A11yDecorator'
						},
						{
							'title': 'memberof',
							'description': 'ui/A11yDecorator'
						},
						{
							'title': 'hoc',
							'description': null
						},
						{
							'title': 'public',
							'description': null
						}
					],
					'augments': [],
					'examples': [],
					'params': [],
					'properties': [],
					'returns': [],
					'sees': [],
					'throws': [],
					'kind': 'class',
					'name': 'A11yDecorator',
					'memberof': 'ui/A11yDecorator',
					'access': 'public',
					'members': {
						'global': [],
						'inner': [],
						'instance': [
							{
								'description': {
									'type': 'root',
									'children': [
										{
											'type': 'paragraph',
											'children': [
												{
													'type': 'text',
													'value': 'Sets the value of the '
												},
												{
													'type': 'inlineCode',
													'value': 'aria-label'
												},
												{
													'type': 'text',
													'value': ' attribute for the wrapped component.'
												}
											]
										}
									]
								},
								'tags': [
									{
										'title': 'memberof',
										'description': 'ui/A11yDecorator.A11yDecorator.prototype'
									},
									{
										'title': 'type',
										'description': null,
										'type': {
											'type': 'NameExpression',
											'name': 'String'
										}
									},
									{
										'title': 'public',
										'description': null
									}
								],
								'augments': [],
								'examples': [],
								'params': [],
								'properties': [],
								'returns': [],
								'sees': [],
								'throws': [],
								'memberof': 'ui/A11yDecorator.A11yDecorator',
								'type': {
									'type': 'NameExpression',
									'name': 'String'
								},
								'access': 'public',
								'name': 'aria-label',
								'scope': 'instance',
								'members': {
									'global': [],
									'inner': [],
									'instance': [],
									'events': [],
									'static': []
								},
								'namespace': 'ui/A11yDecoratorA11yDecorator#aria-label'
							},
							{
								'description': {
									'type': 'root',
									'children': [
										{
											'type': 'paragraph',
											'children': [
												{
													'type': 'text',
													'value': 'Sets the hint text to be read after the content.'
												}
											]
										}
									]
								},
								'tags': [
									{
										'title': 'type',
										'description': null,
										'type': {
											'type': 'NameExpression',
											'name': 'String'
										}
									},
									{
										'title': 'public',
										'description': null
									}
								],
								'augments': [],
								'examples': [],
								'params': [],
								'properties': [],
								'returns': [],
								'sees': [],
								'throws': [],
								'type': {
									'type': 'NameExpression',
									'name': 'String'
								},
								'access': 'public',
								'name': 'accessibilityHint',
								'memberof': 'ui/A11yDecorator.A11yDecorator',
								'scope': 'instance',
								'members': {
									'global': [],
									'inner': [],
									'instance': [],
									'events': [],
									'static': []
								},
								'namespace': 'ui/A11yDecoratorA11yDecorator#accessibilityHint'
							},
							{
								'description': {
									'type': 'root',
									'children': [
										{
											'type': 'paragraph',
											'children': [
												{
													'type': 'text',
													'value': 'Sets the hint text to be read before the content.'
												}
											]
										}
									]
								},
								'tags': [
									{
										'title': 'type',
										'description': null,
										'type': {
											'type': 'NameExpression',
											'name': 'String'
										}
									},
									{
										'title': 'public',
										'description': null
									}
								],
								'augments': [],
								'examples': [],
								'params': [],
								'properties': [],
								'returns': [],
								'sees': [],
								'throws': [],
								'type': {
									'type': 'NameExpression',
									'name': 'String'
								},
								'access': 'public',
								'name': 'accessibilityPreHint',
								'memberof': 'ui/A11yDecorator.A11yDecorator',
								'scope': 'instance',
								'members': {
									'global': [],
									'inner': [],
									'instance': [],
									'events': [],
									'static': []
								},
								'namespace': 'ui/A11yDecoratorA11yDecorator#accessibilityPreHint'
							}
						],
						'events': [],
						'static': [
							{
								'description': {
									'type': 'root',
									'children': [
										{
											'type': 'paragraph',
											'children': [
												{
													'type': 'text',
													'value': 'Default config for '
												},
												{
													'type': 'link',
													'url': 'ui/A11yDecorator.A11yDecorator',
													'title': null,
													'jsdoc': true,
													'children': [
														{
															'type': 'text',
															'value': 'ui/A11yDecorator.A11yDecorator'
														}
													]
												},
												{
													'type': 'text',
													'value': '.'
												}
											]
										}
									]
								},
								'tags': [
									{
										'title': 'memberof',
										'description': 'ui/A11yDecorator.A11yDecorator'
									},
									{
										'title': 'hocconfig',
										'description': null
									}
								],
								'augments': [],
								'examples': [],
								'params': [],
								'properties': [],
								'returns': [],
								'sees': [],
								'throws': [],
								'memberof': 'ui/A11yDecorator.A11yDecorator',
								'name': 'defaultConfig',
								'kind': 'constant',
								'members': {
									'global': [],
									'inner': [],
									'instance': [],
									'events': [],
									'static': [
										{
											'description': {
												'type': 'root',
												'children': [
													{
														'type': 'paragraph',
														'children': [
															{
																'type': 'text',
																'value': "Configures the prop for the source of the component's content"
															}
														]
													}
												]
											},
											'tags': [
												{
													'title': 'type',
													'description': null,
													'type': {
														'type': 'NameExpression',
														'name': 'String'
													}
												},
												{
													'title': 'default',
													'description': "'children'"
												},
												{
													'title': 'memberof',
													'description': 'ui/A11yDecorator.A11yDecorator.defaultConfig'
												}
											],
											'augments': [],
											'examples': [],
											'params': [],
											'properties': [],
											'returns': [],
											'sees': [],
											'throws': [],
											'type': {
												'type': 'NameExpression',
												'name': 'String'
											},
											'memberof': 'ui/A11yDecorator.A11yDecorator.defaultConfig',
											'name': 'prop',
											'members': {
												'global': [],
												'inner': [],
												'instance': [],
												'events': [],
												'static': []
											},
											'namespace': 'ui/A11yDecoratorA11yDecoratordefaultConfigprop'
										}
									]
								},
								'namespace': 'ui/A11yDecoratorA11yDecoratordefaultConfig'
							}
						]
					},
					'namespace': 'ui/A11yDecoratorA11yDecorator'
				}
			]
		},
		'namespace': 'ui/A11yDecorator'
	}
];


exports.emptyModule = {
	'description': {
		'type': 'root',
		'children': [
			{
				'type': 'paragraph',
				'children': [
					{
						'type': 'text',
						'value': 'Provides a higher-order component to add accessibility utility features to a component.'
					}
				]
			}
		]
	},
	'tags': [
		{
			'title': 'module',
			'description': null,
			'type': null,
			'name': 'ui/A11yDecorator'
		}
	],
	'augments': [],
	'examples': [],
	'params': [],
	'properties': [],
	'returns': [],
	'sees': [],
	'throws': [],
	'kind': 'module',
	'name': 'ui/A11yDecorator',
	'members': {
		'global': [],
		'inner': [],
		'instance': [],
		'events': [],
		'static': []
	},
	'namespace': 'ui/A11yDecorator'
};

exports.emptyModuleOutput =
`// Type definitions for ui/A11yDecorator

import * as React from "react";

`;

exports.completeHoc = 				{
	'description': {
		'type': 'root',
		'children': [
			{
				'type': 'paragraph',
				'children': [
					{
						'type': 'text',
						'value': 'A higher-order component that adds support for hint text to be read before and/or after the content.'
					}
				]
			},
			{
				'type': 'paragraph',
				'children': [
					{
						'type': 'text',
						'value': 'By default, the '
					},
					{
						'type': 'inlineCode',
						'value': 'children'
					},
					{
						'type': 'text',
						'value': ' prop is used as the source of the components content but may be\nconfigured by passing a different '
					},
					{
						'type': 'inlineCode',
						'value': 'prop'
					},
					{
						'type': 'text',
						'value': ' to the HOC configuration.'
					}
				]
			},
			{
				'type': 'paragraph',
				'children': [
					{
						'type': 'text',
						'value': 'Usage:'
					}
				]
			},
			{
				'type': 'code',
				'lang': null,
				'value': 'const MyComponent = A11yDecorator(MyComponentBase);\n\n// passes an aria-label property to MyComponentBase with accessibilityPreHint and\n// accessibilityHint wrapping children\n<MyComponent accessibilityPreHint="before children" accessibilityHint="after children">\n	{children}\n</MyComponent>'
			}
		]
	},
	'tags': [
		{
			'title': 'class',
			'description': null,
			'type': null,
			'name': 'A11yDecorator'
		},
		{
			'title': 'memberof',
			'description': 'ui/A11yDecorator'
		},
		{
			'title': 'hoc',
			'description': null
		},
		{
			'title': 'public',
			'description': null
		}
	],
	'augments': [],
	'examples': [],
	'params': [],
	'properties': [],
	'returns': [],
	'sees': [],
	'throws': [],
	'kind': 'class',
	'name': 'A11yDecorator',
	'memberof': 'ui/A11yDecorator',
	'access': 'public',
	'members': {
		'global': [],
		'inner': [],
		'instance': [
			{
				'description': {
					'type': 'root',
					'children': [
						{
							'type': 'paragraph',
							'children': [
								{
									'type': 'text',
									'value': 'Sets the value of the '
								},
								{
									'type': 'inlineCode',
									'value': 'aria-label'
								},
								{
									'type': 'text',
									'value': ' attribute for the wrapped component.'
								}
							]
						}
					]
				},
				'tags': [
					{
						'title': 'memberof',
						'description': 'ui/A11yDecorator.A11yDecorator.prototype'
					},
					{
						'title': 'type',
						'description': null,
						'type': {
							'type': 'NameExpression',
							'name': 'String'
						}
					},
					{
						'title': 'public',
						'description': null
					}
				],
				'augments': [],
				'examples': [],
				'params': [],
				'properties': [],
				'returns': [],
				'sees': [],
				'throws': [],
				'memberof': 'ui/A11yDecorator.A11yDecorator',
				'type': {
					'type': 'NameExpression',
					'name': 'String'
				},
				'access': 'public',
				'name': 'aria-label',
				'scope': 'instance',
				'members': {
					'global': [],
					'inner': [],
					'instance': [],
					'events': [],
					'static': []
				},
				'namespace': 'ui/A11yDecoratorA11yDecorator#aria-label'
			},
			{
				'description': {
					'type': 'root',
					'children': [
						{
							'type': 'paragraph',
							'children': [
								{
									'type': 'text',
									'value': 'Sets the hint text to be read after the content.'
								}
							]
						}
					]
				},
				'tags': [
					{
						'title': 'type',
						'description': null,
						'type': {
							'type': 'NameExpression',
							'name': 'String'
						}
					},
					{
						'title': 'public',
						'description': null
					}
				],
				'augments': [],
				'examples': [],
				'params': [],
				'properties': [],
				'returns': [],
				'sees': [],
				'throws': [],
				'type': {
					'type': 'NameExpression',
					'name': 'String'
				},
				'access': 'public',
				'name': 'accessibilityHint',
				'memberof': 'ui/A11yDecorator.A11yDecorator',
				'scope': 'instance',
				'members': {
					'global': [],
					'inner': [],
					'instance': [],
					'events': [],
					'static': []
				},
				'namespace': 'ui/A11yDecoratorA11yDecorator#accessibilityHint'
			},
			{
				'description': {
					'type': 'root',
					'children': [
						{
							'type': 'paragraph',
							'children': [
								{
									'type': 'text',
									'value': 'Sets the hint text to be read before the content.'
								}
							]
						}
					]
				},
				'tags': [
					{
						'title': 'type',
						'description': null,
						'type': {
							'type': 'NameExpression',
							'name': 'String'
						}
					},
					{
						'title': 'public',
						'description': null
					}
				],
				'augments': [],
				'examples': [],
				'params': [],
				'properties': [],
				'returns': [],
				'sees': [],
				'throws': [],
				'type': {
					'type': 'NameExpression',
					'name': 'String'
				},
				'access': 'public',
				'name': 'accessibilityPreHint',
				'memberof': 'ui/A11yDecorator.A11yDecorator',
				'scope': 'instance',
				'members': {
					'global': [],
					'inner': [],
					'instance': [],
					'events': [],
					'static': []
				},
				'namespace': 'ui/A11yDecoratorA11yDecorator#accessibilityPreHint'
			}
		],
		'events': [],
		'static': [
			{
				'description': {
					'type': 'root',
					'children': [
						{
							'type': 'paragraph',
							'children': [
								{
									'type': 'text',
									'value': 'Default config for '
								},
								{
									'type': 'link',
									'url': 'ui/A11yDecorator.A11yDecorator',
									'title': null,
									'jsdoc': true,
									'children': [
										{
											'type': 'text',
											'value': 'ui/A11yDecorator.A11yDecorator'
										}
									]
								},
								{
									'type': 'text',
									'value': '.'
								}
							]
						}
					]
				},
				'tags': [
					{
						'title': 'memberof',
						'description': 'ui/A11yDecorator.A11yDecorator'
					},
					{
						'title': 'hocconfig',
						'description': null
					}
				],
				'augments': [],
				'examples': [],
				'params': [],
				'properties': [],
				'returns': [],
				'sees': [],
				'throws': [],
				'memberof': 'ui/A11yDecorator.A11yDecorator',
				'name': 'defaultConfig',
				'kind': 'constant',
				'members': {
					'global': [],
					'inner': [],
					'instance': [],
					'events': [],
					'static': [
						{
							'description': {
								'type': 'root',
								'children': [
									{
										'type': 'paragraph',
										'children': [
											{
												'type': 'text',
												'value': "Configures the prop for the source of the component's content"
											}
										]
									}
								]
							},
							'tags': [
								{
									'title': 'type',
									'description': null,
									'type': {
										'type': 'NameExpression',
										'name': 'String'
									}
								},
								{
									'title': 'default',
									'description': "'children'"
								},
								{
									'title': 'memberof',
									'description': 'ui/A11yDecorator.A11yDecorator.defaultConfig'
								}
							],
							'augments': [],
							'examples': [],
							'params': [],
							'properties': [],
							'returns': [],
							'sees': [],
							'throws': [],
							'type': {
								'type': 'NameExpression',
								'name': 'String'
							},
							'memberof': 'ui/A11yDecorator.A11yDecorator.defaultConfig',
							'name': 'prop',
							'members': {
								'global': [],
								'inner': [],
								'instance': [],
								'events': [],
								'static': []
							},
							'namespace': 'ui/A11yDecoratorA11yDecoratordefaultConfigprop'
						}
					]
				},
				'namespace': 'ui/A11yDecoratorA11yDecoratordefaultConfig'
			}
		]
	},
	'namespace': 'ui/A11yDecoratorA11yDecorator'
};

exports.completeHocOutput =
`export interface A11yDecoratorConfig {
	prop?: string;
}

export interface A11yDecoratorProps {
	aria-label?: string;
	accessibilityHint?: string;
	accessibilityPreHint?: string;
}

export function A11yDecorator<P extends A11yDecoratorProps>(config: A11yDecoratorConfig, Component: React.ComponentType<P>): React.Component<P & A11yDecoratorProps>;

`;

exports.simpleFunction = {
	'description': {
		'type': 'root',
		'children': [
			{
				'type': 'paragraph',
				'children': [
					{
						'type': 'text',
						'value': 'Capitalizes a given string (not locale-aware).'
					}
				]
			}
		]
	},
	'tags': [
		{
			'title': 'function',
			'description': null,
			'name': null
		},
		{
			'title': 'param',
			'description': 'The string to capitalize.',
			'type': {
				'type': 'NameExpression',
				'name': 'String'
			},
			'name': 'str'
		},
		{
			'title': 'returns',
			'description': 'The capitalized string.',
			'type': {
				'type': 'NameExpression',
				'name': 'String'
			}
		},
		{
			'title': 'memberof',
			'description': 'core/util'
		},
		{
			'title': 'public',
			'description': null
		}
	],
	'augments': [],
	'examples': [],
	'params': [
		{
			'title': 'param',
			'name': 'str',
			'description': {
				'type': 'root',
				'children': [
					{
						'type': 'paragraph',
						'children': [
							{
								'type': 'text',
								'value': 'The string to capitalize.'
							}
						]
					}
				]
			},
			'type': {
				'type': 'NameExpression',
				'name': 'String'
			}
		}
	],
	'properties': [],
	'returns': [
		{
			'description': {
				'type': 'root',
				'children': [
					{
						'type': 'paragraph',
						'children': [
							{
								'type': 'text',
								'value': 'The capitalized string.'
							}
						]
					}
				]
			},
			'title': 'returns',
			'type': {
				'type': 'NameExpression',
				'name': 'String'
			}
		}
	],
	'sees': [],
	'throws': [],
	'kind': 'function',
	'memberof': 'core/util',
	'access': 'public',
	'name': 'cap',
	'members': {
		'global': [],
		'inner': [],
		'instance': [],
		'events': [],
		'static': []
	},
	'namespace': 'core/utilcap'
};

exports.simpleFunctionOutput = 'export function cap(string): string;\n\n';
