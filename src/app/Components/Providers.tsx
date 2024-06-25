"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import {AntdRegistry} from "@ant-design/nextjs-registry";

type Props = {
	children: ReactNode
}

const queryClient = new QueryClient()

const Providers = ({ children }: Props) => {
	return (
		<AntdRegistry>
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		</AntdRegistry>
	)
}

export default Providers