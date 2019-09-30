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
`
		// Type definitions for ui/A11yDecorator

\t\t

		type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
		type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;
\t
\t\t

\t\t
\t`;

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

exports.completeHocOutput = 'export interface A11yDecoratorConfig extends Object {\n\t\t/**\n * Configures the prop for the source of the component\'s content\n */\nprop?: string;\n\t}\n\t\texport interface A11yDecoratorProps  {\n\t\t/**\n * Sets the value of the  `aria-label`  attribute for the wrapped component.\n */\n\'aria-label\'?: string;\n/**\n * Sets the hint text to be read after the content.\n */\naccessibilityHint?: string;\n/**\n * Sets the hint text to be read before the content.\n */\naccessibilityPreHint?: string;\n\t}\n\t\texport function A11yDecorator<P>(\n\t\t\tconfig: A11yDecoratorConfig,\n\t\t\tComponent: React.ComponentType<P> | string\n\t\t): React.ComponentType<P & A11yDecoratorProps>;\n\t\t\n\t\t\texport function A11yDecorator<P>(\n\t\t\t\tComponent: React.ComponentType<P> | string\n\t\t\t): React.ComponentType<P & A11yDecoratorProps>;\n\t\t\n\t';

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

exports.simpleFunctionOutput =
`/**
 * Capitalizes a given string (not locale-aware).
 */
function cap(str: string): string;`;
