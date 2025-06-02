import argparse
import os
import subprocess
import re

class Tree:
    def __init__(self):
        self.root = None

    def insert_node(self, node, path):
        if path == '/':
            self.root = node
            return

        split_path = ['/'] + [p for p in path.split('/') if p != '']

        def helper(current_node, i):
            if i == len(split_path) - 2: # second to last elem in split_path
                current_node.insert_child(node)
                return 
            helper(current_node.get_child(split_path[i + 1]), i + 1)

        helper(self.root, 0)

    def dfs(self, f):
        def helper(current_node):
            f(current_node)
            for node in current_node.children.values():
                helper(node)
        helper(self.root)

    def __str__(self):
        def helper(node, path):
            if not node:
                return
            string = path + str(node) + '\n' 
            for n in node.children.values():
                string += helper(n, path + str(node) + ('/' if node != self.root else ''))
            return string
        return helper(self.root, '').strip()

class Node:
    def __init__(self, label, path):
        self.label = label
        self.path = path
        self.children = {}

    def insert_child(self, node):
         self.children[node.label] = node

    def get_child(self, label):
        if not self.children[label]:
            return None
        return self.children[label]
    
    def __str__(self):
        return self.label

# TODO Read in every file 

class Controller:
    def __init__(self, base_path):
        self.base_path = base_path
        self.tree = Tree()

        for path in self.find_relevant_directories():
            trimmed_path = path.replace(self.base_path, '/').replace(self.base_path[:-1], '/')
            trimmed_path = re.sub(r'/+', '/', trimmed_path)
            node = Node(label=self.basename(trimmed_path), path=trimmed_path)
            self.tree.insert_node(node, trimmed_path)

    def print_all_files(self):
        def f(node: Node):
            path = self.base_path + node.path
            page_path = path + '/page.html'
            page_path = re.sub(r'/+', '/', page_path)
            with open(page_path) as f:
                print(f.read())

        controller.tree.dfs(f)

    def find_files(self):
        cmd = [
            'find',
            self.base_path
        ]

        out = subprocess.check_output(cmd)

        return [line for line in out.decode().split('\n') if line != '']

    def find_html_files(self):
        return [path for path in self.find_files() 
            if re.search(r"\.html$", path) != None]
    
    def find_page_files(self):
        return [path for path in self.find_html_files() 
            if re.search(r"page\.html$", path) != None]

    def find_layout_files(self):
        return [path for path in self.find_html_files() 
            if re.search(r"layout\.html$", path) != None]

    def find_css_files(self):
        return [path for path in self.find_files() 
            if re.search(r"\.css$", path)]

    def find_relevant_directories(self):
        arr = [self.dirname(path) for path in self.find_page_files()[::-1]]
        arr.sort()
        return arr

    def basename(self, path):
        return subprocess.check_output(['basename', path]).decode().strip()

    def dirname(self, path):
        return subprocess.check_output(['dirname', path]).decode().strip()

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('path')
    args = parser.parse_args()

    base_path = args.path
    controller = Controller(base_path)
    controller.print_all_files()
